import { Tab, Tabs } from '@nextui-org/react'
import ShowOperationMaster from './ShowOperationMaster'
import ListOperationsMaster from './ListOperationsMaster'
import ListVideosMain from '../balances/balancing/tableOperations/videoOperations/videoSidebarMain/ListVideosMain'

const TabsOperationsMaster = ({showOperation, tabState, setTabState}) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={tabState}
        onSelectionChange={setTabState}
      >
        <Tab 
          key="Detalles de las operaciones" 
          title={
            showOperation && showOperation.operation ? 
              showOperation.operation :
              'Detalle de las operaciones'
          }>
          
          {
            tabState && "Detalles de las operaciones" && 
              showOperation ? 
                <ShowOperationMaster/> :
                <ListOperationsMaster />
          }
         
        </Tab>
        <Tab key="Operaciones y vídeos" title="Operaciones y vídeos">
          {
            tabState && "Operaciones y vídeos" && 
              <ListVideosMain/>
          }
          
        </Tab>
       
      </Tabs>
    </div>
  )
}

export default TabsOperationsMaster