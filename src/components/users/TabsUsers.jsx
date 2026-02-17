import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { currentUser, tokenMemory } from '../../infraestructure/states/states_views';
import toast from 'react-hot-toast';
import { FaUserAltSlash } from 'react-icons/fa';
import IndexUsers from './IndexUsers';
import ProfileUser from './ProfileUser';

const TabsUsers = ({ setIsOpen, activeTab, setActiveTab }) => {
  const [user, setUser] = useRecoilState(currentUser);

  const [token, setToken] = useRecoilState(tokenMemory);

  const handleClose = () => {
    setIsOpen(false)
    setUser(null)
    localStorage.removeItem('token');
    setToken('')
    toast("Sesión cerrada correctamente")
  }

  return (
    <div className="flex w-full flex-col">
      {
        user && 
          <Tabs
            aria-label="Options"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key)}
          >
            <Tab key="mi-usuario" title="Mi usuario">
              <ProfileUser user={user} handleClose={handleClose} />
            </Tab>
            {
              user && user.role === 'admin'  &&
                <Tab key="administrar" title="Administrar">
                  <Card>
                    <CardBody>
                      <IndexUsers/>
                    </CardBody>
                  </Card>
                </Tab>
            }
          </Tabs>
      }
      
    </div>
  )
}

export default TabsUsers
