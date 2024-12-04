import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import FormOperationCustom from "./FormOperationCustom.jsx";
import CloneCustom from "./CloneCustom.jsx";

const TabOperationsCustom = () => {
  const [selected, setSelected] = React.useState("agregar");

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="agregar" title="Agregar">
          <Card>
            <CardBody>
              <FormOperationCustom/>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="clonar" title="Clonar">
          <Card>
            <CardBody>
              <CloneCustom/>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabOperationsCustom;