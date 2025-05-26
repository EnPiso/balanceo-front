import { Tab, Tabs } from '@nextui-org/react'
import ShowOperMaster from '../opers_master/ShowOperMaster'
import ListOpersMaster from '../opers_master/ListOpersMaster'
import ListUserPolyvalences from './ListUserPolyvalences'

const TabsOperatorMasterPol = ({tabState, setTabState, operMaster}) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={tabState}
        onSelectionChange={setTabState}
      >
        <Tab 
          key="Detalle de los Operarios" 
          title={
              'Detalle de los Operarios'
          }>
          
        {
          operMaster ? 
            <ShowOperMaster/> : 
            <ListOpersMaster/>
        }
         
         
        </Tab>
        <Tab 
          key="Polivalencia" 
          title="Polivalencia">
            <ListUserPolyvalences/>
        </Tab>
       
      </Tabs>
    </div>
  )
}

export default TabsOperatorMasterPol