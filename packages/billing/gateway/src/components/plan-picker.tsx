'use client';

import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
  BillingConfig,
  LineItemSchema,
  getBaseLineItem,
  getPlanIntervals,
  getProductPlanPair,
} from '@kit/billing';
import { formatCurrency } from '@kit/shared/utils';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { Heading } from '@kit/ui/heading';
import { If } from '@kit/ui/if';
import { Label } from '@kit/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from '@kit/ui/radio-group';
import { Trans } from '@kit/ui/trans';
import { cn } from '@kit/ui/utils';

import { LineItemDetails } from './line-item-details';

export function PlanPicker(
  props: React.PropsWithChildren<{
    config: BillingConfig;
    onSubmit: (data: { planId: string; productId: string }) => void;
    canStartTrial?: boolean;
    pending?: boolean;
  }>,
) {
  const intervals = useMemo(
    () => getPlanIntervals(props.config),
    [props.config],
  ) as string[];

  const form = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: zodResolver(
      z
        .object({
          planId: z.string().min(1),
          productId: z.string().min(1),
          interval: z.string().min(1),
        })
        .refine(
          (data) => {
            try {
              const { product, plan } = getProductPlanPair(
                props.config,
                data.planId,
              );

              return product && plan;
            } catch {
              return false;
            }
          },
          { message: `Please pick a plan to continue`, path: ['planId'] },
        ),
    ),
    defaultValues: {
      interval: intervals[0],
      planId: '',
      productId: '',
    },
  });

  const { interval: selectedInterval } = form.watch();
  const planId = form.getValues('planId');

  const { plan: selectedPlan, product: selectedProduct } = useMemo(() => {
    try {
      return getProductPlanPair(props.config, planId);
    } catch {
      return {
        plan: null,
        product: null,
      };
    }
  }, [props.config, planId]);

  const { t } = useTranslation(`billing`);

  // display the period picker if the selected plan is recurring or if no plan is selected
  const isRecurringPlan =
    selectedPlan?.paymentType === 'recurring' || !selectedPlan;

  return (
    <Form {...form}>
      <div
        className={
          'flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0'
        }
      >
        <form
          className={'flex w-full max-w-xl flex-col space-y-4'}
          onSubmit={form.handleSubmit(props.onSubmit)}
        >
          <div
            className={cn('transition-all', {
              ['pointer-events-none opacity-50']: !isRecurringPlan,
            })}
          >
            <FormField
              name={'interval'}
              render={({ field }) => {
                return (
                  <FormItem className={'rounded-md border p-4'}>
                    <FormLabel htmlFor={'plan-picker-id'}>
                      <Trans i18nKey={'common:billingInterval.label'} />
                    </FormLabel>

                    <FormControl id={'plan-picker-id'}>
                      <RadioGroup name={field.name} value={field.value}>
                        <div className={'flex space-x-2.5'}>
                          {intervals.map((interval) => {
                            const selected = field.value === interval;

                            return (
                              <label
                                htmlFor={interval}
                                key={interval}
                                className={cn(
                                  'hover:bg-muted flex items-center space-x-2 rounded-md border border-transparent px-4 py-2',
                                  {
                                    ['border-border']: selected,
                                    ['hover:bg-muted']: !selected,
                                  },
                                )}
                              >
                                <RadioGroupItem
                                  id={interval}
                                  value={interval}
                                  onClick={() => {
                                    form.setValue('planId', '', {
                                      shouldValidate: true,
                                    });

                                    form.setValue('productId', '', {
                                      shouldValidate: true,
                                    });

                                    form.setValue('interval', interval, {
                                      shouldValidate: true,
                                    });
                                  }}
                                />

                                <span className={'text-sm font-bold'}>
                                  <Trans
                                    i18nKey={`billing:billingInterval.${interval}`}
                                  />
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            name={'planId'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans i18nKey={'common:planPickerLabel'} />
                </FormLabel>

                <FormControl>
                  <RadioGroup name={field.name}>
                    {props.config.products.map((product) => {
                      const plan = product.plans.find((item) => {
                        if (item.paymentType === 'one-time') {
                          return true;
                        }

                        return item.interval === selectedInterval;
                      });

                      if (!plan) {
                        return null;
                      }

                      const baseLineItem = getBaseLineItem(
                        props.config,
                        plan.id,
                      );

                      return (
                        <RadioGroupItemLabel
                          selected={field.value === plan.id}
                          key={plan.id}
                        >
                          <RadioGroupItem
                            id={plan.id}
                            value={plan.id}
                            onClick={() => {
                              form.setValue('planId', plan.id, {
                                shouldValidate: true,
                              });

                              form.setValue('productId', product.id, {
                                shouldValidate: true,
                              });
                            }}
                          />

                          <div
                            className={
                              'flex w-full items-center justify-between'
                            }
                          >
                            <Label
                              htmlFor={plan.id}
                              className={
                                'flex flex-col justify-center space-y-2'
                              }
                            >
                              <span className="font-bold">
                                <Trans
                                  i18nKey={`billing:products.${product.id}.name`}
                                  defaults={product.name}
                                />
                              </span>

                              <span className={'text-muted-foreground'}>
                                <Trans
                                  i18nKey={`billing:products.${product.id}.description`}
                                  defaults={product.description}
                                />
                              </span>
                            </Label>

                            <div
                              className={
                                'flex items-center space-x-4 text-right'
                              }
                            >
                              <If
                                condition={
                                  plan.trialPeriod && props.canStartTrial
                                }
                              >
                                <div>
                                  <Badge variant={'success'}>
                                    <Trans
                                      i18nKey={`billing:trialPeriod`}
                                      values={{
                                        period: plan.trialPeriod,
                                      }}
                                    />
                                  </Badge>
                                </div>
                              </If>

                              <div>
                                <Price key={plan.id}>
                                  <span>
                                    {formatCurrency(
                                      product.currency.toLowerCase(),
                                      baseLineItem.cost,
                                    )}
                                  </span>
                                </Price>

                                <div>
                                  <span className={'text-muted-foreground'}>
                                    <If
                                      condition={
                                        plan.paymentType === 'recurring'
                                      }
                                      fallback={
                                        <Trans i18nKey={`billing:lifetime`} />
                                      }
                                    >
                                      <Trans
                                        i18nKey={`billing:perPeriod`}
                                        values={{
                                          period: selectedInterval,
                                        }}
                                      />
                                    </If>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </RadioGroupItemLabel>
                      );
                    })}
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button disabled={props.pending ?? !form.formState.isValid}>
              {props.pending ? (
                t('processing')
              ) : (
                <>
                  <If
                    condition={selectedPlan?.trialPeriod && props.canStartTrial}
                    fallback={t(`proceedToPayment`)}
                  >
                    <span>{t(`startTrial`)}</span>
                  </If>

                  <ArrowRight className={'ml-2 h-4 w-4'} />
                </>
              )}
            </Button>
          </div>
        </form>

        {selectedPlan && selectedInterval && selectedProduct ? (
          <PlanDetails
            selectedInterval={selectedInterval}
            selectedPlan={selectedPlan}
            selectedProduct={selectedProduct}
          />
        ) : null}
      </div>
    </Form>
  );
}

function PlanDetails({
  selectedProduct,
  selectedInterval,
  selectedPlan,
}: {
  selectedProduct: {
    id: string;
    name: string;
    description: string;
    currency: string;
    features: string[];
  };

  selectedInterval: string;

  selectedPlan: {
    lineItems: z.infer<typeof LineItemSchema>[];
    paymentType: string;
  };
}) {
  const isRecurring = selectedPlan.paymentType === 'recurring';

  return (
    <div
      className={
        'fade-in animate-in zoom-in-90 flex w-full flex-col space-y-4 rounded-lg border p-4'
      }
    >
      <div className={'flex flex-col space-y-0.5'}>
        <Heading level={5}>
          <b>
            <Trans
              i18nKey={`billing:products.${selectedProduct.id}.name`}
              defaults={selectedProduct.name}
            />
          </b>{' '}
          <If condition={isRecurring}>
            / <Trans i18nKey={`billing:billingInterval.${selectedInterval}`} />
          </If>
        </Heading>

        <p>
          <span className={'text-muted-foreground'}>
            <Trans
              i18nKey={`billing:products.${selectedProduct.id}.description`}
              defaults={selectedProduct.description}
            />
          </span>
        </p>
      </div>

      <div className={'flex flex-col space-y-1'}>
        <span className={'font-semibold'}>
          <Trans i18nKey={'billing:detailsLabel'} />
        </span>

        <LineItemDetails
          lineItems={selectedPlan.lineItems ?? []}
          selectedInterval={isRecurring ? selectedInterval : undefined}
          currency={selectedProduct.currency}
        />
      </div>

      <div className={'flex flex-col space-y-2'}>
        <span className={'font-semibold'}>
          <Trans i18nKey={'billing:featuresLabel'} />
        </span>

        {selectedProduct.features.map((item) => {
          return (
            <div key={item} className={'flex items-center space-x-2 text-sm'}>
              <CheckCircle className={'h-4 text-green-500'} />

              <span className={'text-muted-foreground'}>
                <Trans i18nKey={`billing:features.${item}`} defaults={item} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Price(props: React.PropsWithChildren) {
  return (
    <span
      className={
        'animate-in slide-in-from-left-4 fade-in text-xl font-bold duration-500'
      }
    >
      {props.children}
    </span>
  );
}