-- insert new permissions
alter type public.app_permissions add value 'tickets.update';
alter type public.app_permissions add value 'tickets.delete';
commit;

-- grant permissions to the owner role
insert into public.role_permissions(
  role,
  permission)
values
  ('owner', 'tickets.update'),
  ('owner', 'tickets.delete');

--  public.message_author: enum type for message author
create type public.message_author as enum ('support', 'customer');

-- public.ticket_status: enum type for ticket status
create type public.ticket_status as enum ('open', 'closed', 'resolved', 'in_progress');

-- public.ticket_priority: enum type for ticket priority
create type public.ticket_priority as enum ('low', 'medium', 'high');

/*
* Table: public.tickets
*/
-- public.accounts: table for the support tickets
create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  title varchar(255) not null,
  category varchar(100) not null default 'general',
  assigned_to uuid references public.accounts(id) on delete set null,
  priority public.ticket_priority not null default 'medium',
  status public.ticket_status not null default 'open',
  customer_email varchar(255),
  resolution text,
  resolved_at timestamptz,
  resolved_by uuid references public.accounts(id) on delete set null,
  closed_at timestamptz,
  closed_by uuid references public.accounts(id) on delete set null
);

-- revoke permissions on public.tickets
revoke all on public.tickets from public, service_role;

-- grant required permissions on public.tickets
grant select, insert, update, delete on public.tickets to authenticated;
grant select, insert on public.tickets to service_role;

-- Indexes
create index ix_tickets_account_id on public.tickets(account_id);

-- RLS
alter table public.tickets enable row level security;

-- SELECT(public.tickets)
create policy select_tickets
  on public.tickets
  for select
  to authenticated
  using (
    public.has_role_on_account(account_id)
  );

-- DELETE(public.tickets)
create policy delete_tickets
  on public.tickets
  for delete
  to authenticated
  using (
    public.has_permission((select auth.uid()), account_id, 'tickets.delete'::app_permissions)
  );

 -- UPDATE(public.tickets)
create policy update_tickets
  on public.tickets
  for update
  to authenticated
  using (
    public.has_permission((select auth.uid()), account_id, 'tickets.update'::app_permissions)
  )
  with check (
    public.has_permission((select auth.uid()), account_id, 'tickets.update'::app_permissions)
  );

/*
* Table: public.messages
*/
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  author public.message_author not null,
  author_account_id uuid references public.accounts(id) on delete set null,
  content varchar(5000) not null,
  attachment_url varchar(500),
  resolved_at timestamptz,
  resolved_by uuid references public.accounts(id) on delete set null,
  closed_at timestamptz,
  closed_by uuid references public.accounts(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index ix_messages_ticket_id on public.messages(ticket_id);

-- revoke all permissions from the messages table
revoke all on public.messages from public, service_role;

-- grant permissions to the authenticated role
grant select, insert, update, delete on public.messages to authenticated;

grant select, insert on public.messages to service_role;

-- RLS
alter table public.messages enable row level security;

-- Function: public.has_role_on_ticket_account
-- Description: Check if the authenticated user has a role on the account of the ticket
create or replace function public.has_role_on_ticket_account(ticket_id uuid)
  returns boolean
  set search_path = ''
  as $$
  begin
    return exists (
      select 1
      from public.tickets ticket
      where ticket.id = ticket_id
      and public.has_role_on_account(ticket.account_id)
    );
  end;
  $$ language plpgsql stable;

grant execute on function public.has_role_on_ticket_account(uuid) to authenticated;

-- SELECT(public.messages)
create policy select_messages
  on public.messages
  for select
  to authenticated
  using (
    public.has_role_on_ticket_account(ticket_id)
  );

-- INSERT(public.messages)
create policy insert_messages
  on public.messages
  for insert
  to authenticated
  with check (
    public.has_role_on_ticket_account(ticket_id)
  );

/*
* Bucket: attachments
*/
insert into
  storage.buckets (id, name, PUBLIC)
values
  ('attachments', 'attachments', false);

-- Function public.can_read_message
-- Description: Check if the authenticated user can read the message
create or replace function public.can_read_message (message_id uuid)
  returns boolean
  set search_path = ''
  as $$
  begin
    return exists (
      select 1
      from public.messages message
      where message.id = message_id
      and public.has_role_on_ticket_account(message.ticket_id)
    );
  end;
  $$ language plpgsql stable;

grant execute on function public.can_read_message(uuid) to authenticated;

-- RLS policies for storage
create policy message_attachments
  on storage.objects
  for select
  to authenticated using (
    bucket_id = 'attachments'
    and public.can_read_message(
      kit.get_storage_filename_as_uuid (name)
    )
);