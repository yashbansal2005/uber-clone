import React,{createContext,useState} from 'react'


export const UserDataContext = createContext()

const UserContextProvider = ({children}) => {
const [user, setUser] = useState({
    email: '',
    password: '',
    fullName:{
      firstName: '',
      lastName: ''
    }
})

  return (
    
        <UserDataContext.Provider value={{user, setUser}}>
    {children}  
    </UserDataContext.Provider> 
    
  )
}

export default UserContextProvider
