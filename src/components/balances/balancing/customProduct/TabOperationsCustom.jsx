import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import FormOperationCustom from "./FormOperationCustom.jsx";
import CloneCustom from "./CloneCustom.jsx";
import ProductCardCustom from "./ProductCardCustom.jsx";
import DragAndDropApp from "./dragAndDrop/DragAndDropApp.jsx";

const TabOperationsCustom = ({selected,setSelected, onClose}) => {

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="agregar" title="Operaciones">
          <Card>
            <CardBody>

              <ProductCardCustom/>

            </CardBody>
          </Card>
        </Tab>
        <Tab key="clonar" title="Clonar">
          <Card>
            <CardBody>
              <DragAndDropApp
                onClose={onClose}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabOperationsCustom;