import React from 'react';
import { useRecoilState } from 'recoil';
import { isShowOperMaster } from '../../infraestructure/states/opers_states';
import { Avatar } from '@nextui-org/react';
import { hourMinuteSecond, monthDayYear } from '../../infraestructure/utils/dateFormat';

const ShowOperMaster = () => {
  const [operMaster] = useRecoilState(isShowOperMaster);

  if (!operMaster) {
    return <p className="text-center text-gray-500">No hay datos para mostrar.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4">
          {operMaster.avatar && (
            <Avatar
              src={operMaster.avatar}
              alt="Avatar"
              size="lg"
              isBordered
              color="success"
            />
          )}
          <div>
            <h2 className="text-xl font-bold uppercase">{operMaster.name}</h2>
            <p className="text-gray-600 uppercase mt-2">
              Cédula <span className="font-bold ">{operMaster.id_oper}</span>
            </p>
          </div>
        </div>

        {/* Validar que opers_balancings exista */}
        {operMaster.opers_balancings && operMaster.opers_balancings.length > 0 ? (
          <div className="mt-6">
           
            {operMaster.opers_balancings.map((ob) => (
              <div key={ob.id} className="mt-4">
                <span className="flex items-center justify-between bg-zinc-100 py-2 px-1">
                  <h4 className='font-bold uppercase'>Orden de producción: <span className="font-bold text-green-700 ml-2 "> {ob.balancing.order.code} </span> </h4>
                  <span className='ml-4'>
                    {
                      ob.balancing.order.created_at && (
                        <>
                          {monthDayYear(ob.balancing.order.created_at)}
                          <small className="ml-2 font-bold text-black">
                              {
                                hourMinuteSecond(ob.balancing.order.created_at)
                              }
                          </small>
                        </>
                      )
                    }
                  </span>
                </span>
               
                <p><span className="font-bold ml-1 text-zinc-600">{ob.balancing.product.name}</span></p>
                

                {/* Validar que detail_oper_operations exista */}
                {ob.detail_oper_operations && ob.detail_oper_operations.length > 0 && (
                  <div className="mt-2">
                   
                    {ob.detail_oper_operations.map((doo) => (
                      <div key={doo.id} className="mt-2 p-2 border rounded-lg">
                       
                        <p>Operación: {doo.operations_balancing.operation.operation}</p>

                        {/* Validar que balancing.orders exista */}
                        {doo.operations_balancing.balancing.orders &&
                          doo.operations_balancing.balancing.orders.length > 0 && (
                            <div className="mt-2">
                              <h6 className="text-sm font-semibold">Órdenes</h6>
                              <ul className="list-disc list-inside">
                                {doo.operations_balancing.balancing.orders.map((order) => (
                                  <li key={order.id}>
                                    <p>Order ID: {order.id}</p>
                                    <p>Order Name: {order.code}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                        )}

                        {/* Validar que videos exista */}
                        {doo.operations_balancing.videos &&
                          doo.operations_balancing.videos.length > 0 && (
                            <div className="mt-2">
                              <h6 className="text-sm font-semibold">Videos</h6>
                              <div className="flex">
                                {doo.operations_balancing.videos.map((video) => (
                                  <div key={video.id} className="mt-1 mr-2">
                                    <video controls className="w-40 h-24 rounded-lg shadow">
                                      <source src={video.video} type="video/mp4" />
                                    </video>
                                  </div>
                                ))}
                              </div>
                            </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-500">No hay Opers Balancings disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ShowOperMaster;
