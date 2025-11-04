import React from 'react'
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaUserLock } from "react-icons/fa"

const VerifyAccount = () => {
  return (
    <div className="flex justify-center items-center  bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="flex items-center gap-3">
          <FaUserLock className="text-secondary_two text-3xl" />
          <h1 className="text-lg font-semibold">Cuenta desactivada</h1>
        </CardHeader>
        <CardBody>
          <p className="text-gray-700">
            Tu cuenta se encuentra <span className="font-semibold mr-1">desactivada</span> 
            y no puedes acceder al sistema en este momento.
          </p>
          <p className="mt-3 text-gray-700">
            Para poder seguir utilizando tu cuenta, debes ponerte en contacto con el 
            <span className="font-semibold "> administrador del sistema</span>.
          </p>
          
        </CardBody>
      </Card>
    </div>
  )
}

export default VerifyAccount
