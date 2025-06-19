import { Tab, Tabs, Tooltip } from '@nextui-org/react'
import ShowOperMaster from '../opers_master/ShowOperMaster'
import ListOpersMaster from '../opers_master/ListOpersMaster'
import ListUserPolyvalences from './ListUserPolyvalences'
import { FaQuestionCircle, FaRegQuestionCircle } from 'react-icons/fa'
import QuestionnairesDashboard from '../questionnaires/QuestionnairesDashboard'
import { useRecoilState } from 'recoil'
import { TabLoadingBlock } from '../../infraestructure/states/states_questionnaires'
import { useEffect } from 'react'
import { GraphResultDashboard } from '../graphResult/GraphResultDashboard'
import TabsSeleccion from './TabsSeleccion'

const TabsOperatorMasterPol = ({tabState, setTabState, operMaster}) => {
  
  const [tabLoading, setTabLoading] = useRecoilState(TabLoadingBlock)

  const disabledKeys = ["Polivalencia", "Resultados"]

  return (
    <div className="flex w-full flex-col">

      <Tabs
        disabledKeys={tabLoading ? disabledKeys : []}
        aria-label="Options"
        selectedKey={tabState}
        onSelectionChange={setTabState}
      >
        
        <Tab 
          key="Polivalencia" 
          title="Polivalencia">
            {
              tabState === "Polivalencia" &&
              <>
                {
                  operMaster ? 
                    <ShowOperMaster/> : 
                    <ListUserPolyvalences/>
                }
              </>
                
            }
            
        </Tab>

        <Tab 
          key="Resultados" 
          title="Resultados">
            {
              tabState === "Resultados" &&
                <GraphResultDashboard/>
            }
            
        </Tab>

        

      </Tabs>
      
    </div>
  )
}

export default TabsOperatorMasterPol