import { Card, Text, Button, Group, Flex, Box, Space, Loader } from '@mantine/core';
import { FC, useState, useEffect } from 'react';
import { Price, ProductWithPrice } from '@/types/user';
import { UserContextType, useUser } from '@/utils/app/useUser';
import { SegmentedControl } from '@mantine/core';
import { getStripe } from '@/utils/app/stripe-client';
import { postData } from '@/utils/app/helpers';
import { useRouter } from 'next/router';

type BillingInterval = 'year' | 'month';
interface Props {
    closeModal?: ()=>void;
    userData?: UserContextType;
}
const Subscription:FC<Props> = ({closeModal, userData}) => {
    const { user, products, subscription, ...rest } = useUser(userData);
    const router = useRouter();
    const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
    // const [products, setProducts] = useState<ProductWithPrice[]>(products_ || []);
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    // const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setSeg = (value) => {
        setBillingInterval(value);
    }

    console.log(user, rest)
    
    // useEffect(() => {
    //     const fetchData = async() => {
    //         setIsLoading(true);

    //         // if(user) {
    //         //     const subscriptions = await getSubscriptions(user);
    //         //     setSubscriptions(subscriptions);
    //         // }
    //         // if(products.length === 0) {
    //         //     const res = await getActiveProductsWithPrices();
    //         //     setProducts(res);
                
    //         // }
    //         setIsLoading(false);
    //     }
    //     fetchData();
    // }, []);
    
    const handleCheckout = async (price: Price) => {
        if(!user) {
            router.replace('/user/signin');
            return;
        }
        
        if(chkProductStatus(price.product_id)) {           
            return router.replace("/user/account");
        }
        setPriceIdLoading(price.id);

        const return_url = window.location.href;
        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { 
                    price: price,
                    return_url: return_url
                 }
            });
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            return alert((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };
    const chkProductStatus = (product_id) => {
        if(!subscription) {
            return false;
        } else if (subscription.prices?.products?.id == product_id) {
            // return subscriptions.filter((product) => product.prices?.products?.id == product_id);
            return true
        }
        return false;
    }
    return (
        
            products.length > 0 ? <Box
                sx={(theme) => ({
                    padding: theme.spacing.xs,
                })}
            >
                    {
                    // isLoading?
                    //     <Box sx={(theme) =>({
                    //         textAlign: 'center',
                    //     })}>
                    //         <Loader variant='dots' />
                    //     </Box>:<></>
                    }


                    <Box>
                        <Box
                            sx={(theme) => ({
                                textAlign: 'center'
                            })}
                        >
                            <SegmentedControl
                                value={billingInterval}
                                onChange={setSeg}
                                data={[
                                    { label: 'Montly billing', value: 'month' },
                                    { label: 'Yearly billing', value: 'year' },
                                ]}
                            />
                        </Box>

                        <Flex
                            justify='center'
                            gap={`sm`}
                            sx={(theme) => ({
                                padding: theme.spacing.md
                            })}
                        >
                            {products.map((product, key) => {
                                const price = product?.prices?.find(
                                    (price) => price.interval === billingInterval
                                );
                                if (!price) return null;
                                const priceString = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: price.currency,
                                    minimumFractionDigits: 0
                                }).format((price?.unit_amount || 0) / 100);

                                return (
                                    <Card shadow="sm" padding="lg" radius="md" withBorder key={key}>
                                        <Group position="apart" >
                                            <Text weight={500} sx={(theme) => ({
                                                fontSize: '25px'
                                            })}>{product.name}</Text>
                                        </Group>
                                        <Space />
                                        <Text size="md" color="dimmed" >
                                            {product.description}
                                        </Text>
                                        <Space />
                                        <Group
                                            spacing={0}
                                        >
                                            <Text
                                                sx={(theme) => ({
                                                    fontSize: '40px',
                                                    marginTop: '20px',

                                                })}
                                                className='font-extrabold'
                                            >
                                                {priceString}
                                            </Text>
                                            <Text
                                                sx={(theme) => ({
                                                    paddingTop: '40px'
                                                })}
                                            >
                                                /{billingInterval}
                                            </Text>
                                        </Group>
                                        <Space />
                                        <Button
                                            variant="outline" color="blue" fullWidth mt="md" radius="md"
                                            onClick={() => handleCheckout(price)}
                                            disabled={priceIdLoading ? true : false}
                                        >
                                            {
                                                priceIdLoading ?
                                                    <Loader size={`sm`} variant="dots" /> :
                                                    chkProductStatus(product.id) ?
                                                        'Manage' : 'Subscribe'
                                            }
                                        </Button>
                                    </Card>
                                );
                            })}
                        </Flex>
                    </Box>
        </Box>:<></>

    );
};
export default Subscription;
