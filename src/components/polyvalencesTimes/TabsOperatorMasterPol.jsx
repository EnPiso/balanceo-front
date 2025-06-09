import { Tab, Tabs, Tooltip } from '@nextui-org/react'
import ShowOperMaster from '../opers_master/ShowOperMaster'
import ListOpersMaster from '../opers_master/ListOpersMaster'
import ListUserPolyvalences from './ListUserPolyvalences'
import { FaQuestionCircle, FaRegQuestionCircle } from 'react-icons/fa'
import QuestionnairesDashboard from '../questionnaires/QuestionnairesDashboard'
import { useRecoilState } from 'recoil'
import { TabLoadingBlock } from '../../infraestructure/states/states_questionnaires'
import { useEffect } from 'react'

const TabsOperatorMasterPol = ({tabState, setTabState, operMaster}) => {
  
  const [tabLoading, setTabLoading] = useRecoilState(TabLoadingBlock)

  const disabledKeys = ["Detalle de los Operarios", "Polivalencia", "Cuestionarios"]

  return (
    <div className="flex w-full flex-col">
     
      <Tabs
        disabledKeys={tabLoading ? disabledKeys : []}
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
          tabState === "Detalle de los Operarios" &&
            <>
              {
                operMaster ? 
                  <ShowOperMaster/> : 
                  <ListOpersMaster/>
              }
            </>
        }
        
         
        </Tab>
        <Tab 
          key="Polivalencia" 
          title="Polivalencia">
            {
              tabState === "Polivalencia" &&
                <ListUserPolyvalences/>
            }
            
        </Tab>

        <Tab 
          key="Cuestionarios" 
          title="Cuestionarios">
            {
              tabState === "Cuestionarios" &&
                <QuestionnairesDashboard/>
            }
            
        </Tab>

      </Tabs>
      
    </div>
  )
}

export default TabsOperatorMasterPol