// import { useCurrentToken } from '@/redux/features/Auth/authSlice'
// import { useAppSelector } from '@/redux/hooks'
// import { ReactNode } from 'react'
// import { Navigate } from 'react-router-dom'

// export const ProtectedRoute = ({children}: { children: ReactNode}) => {
//   const token =  useAppSelector(useCurrentToken)
//   if(!token){
//     return <Navigate to='/login' replace={true} />
//   }
//   return children
// }

// ProtectedRoute.tsx
import { useCurrentToken, useCurrentUser } from '@/redux/features/Auth/authSlice'
import { useAppSelector } from '@/redux/hooks'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: string[]
}

export const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken)
  const user = useAppSelector(useCurrentUser)
  
  if (!token) {
    return <Navigate to='/login' replace={true} />
  }

  if (requiredRoles && user?.role && !requiredRoles.includes(user.role)) {
    return <Navigate to='/' replace={true} />
  }

  return children
}