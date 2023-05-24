import { useState, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import {
  createServerSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';

import { useUser } from '@/utils/app/useUser';
import { postData } from '@/utils/app/helpers';
import Layout from "@/components/Account/Layout";
import {
  Title,
  Card,
  Box,
  Text,
  Button,
  Flex,
  Loader,
  Divider
} from "@mantine/core";
import { getSubscriptions } from "@/utils/app/supabase-client";
import { Subscription } from '@/types/user';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

const Account = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(false);
  const { isLoading } = useUser();
  const [subscription, setSubscription] = useState<Subscription>();

  if(!user) {
    window.location.href='/signin';
  }
  
  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
        data: {
          return_url: `${window.location.href}`
        }
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const subscription_ = await getSubscriptions(user);
      if (subscription_.length > 0) {
        setSubscription(subscription_[0]);
      }
    }
    fetchData();
  }, [])

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  return (
    <Layout childrenSize='700px'>
      <Box>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2}>Your Plan</Title>
          <Text size="sm" color="dimmed">
            {
              subscription
                ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
                : 'You are currently on the Free plan'
            }
          </Text>
          <Title 
            order={4}
          sx={(theme) => ({
            marginTop: '15px'
          })}>
            {isLoading ? (
              <div className="h-12 mb-2 text-center">
                <Loader variant='dots' />
              </div>
            ) : subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/pricing"><Button variant='outline'>Choose your plan</Button></Link>
            )}

          </Title>
          <Divider my="sm" variant="dashed" />
          <Flex
            justify='space-between'
            align='center'
          >
            <Text>

            </Text>
            <Button className='bg-sky-500/100'
              disabled={loading || !subscription}
              onClick={() => {
                redirectToCustomerPortal()
              }}
            >
              Open Customer Portal
            </Button>
          </Flex>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder mt={20}>
          <Title order={2}>Your Email</Title>
          <Text size="sm" color="dimmed">

          </Text>
          <Title
            order={4}
            sx={(theme) => ({
              marginTop: '15px'
            })}>
            {user ? user.email : undefined}
          </Title>
          <Divider my="sm" variant="dashed" />
          <Flex
            justify='space-between'
            align='center'
          >
            <Text>
              We will email you to verify the change.
            </Text>
          </Flex>
        </Card>
      </Box>

    </Layout>
  )
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    };

  return {
    props: {
      initialSession: session,
      user: session.user
    }
  };
};
export default Account;