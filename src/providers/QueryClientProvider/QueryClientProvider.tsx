import React from 'react'
import {QueryClientProvider as BaseQueryClientProvider, QueryClient} from '@tanstack/react-query'

type IProps = {children: React.ReactNode}

const QueryClientProvider = (props: IProps) => {
  const client = new QueryClient()
  return <BaseQueryClientProvider client={client}>{props.children}</BaseQueryClientProvider>
}

export default QueryClientProvider
