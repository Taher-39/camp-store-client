import { useCurrentToken } from '@/redux/features/Auth/authSlice'
import { useAppSelector } from '@/redux/hooks'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({children}: { children: ReactNode}) => {
  const token =  useAppSelector(useCurrentToken)
  if(!token){
    return <Navigate to='/login' replace={true} />
  }
  return children
}

