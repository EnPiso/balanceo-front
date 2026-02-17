import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";

import DragAndDropApp from "./dragAndDrop/DragAndDropApp.jsx";

const TabOperationsCustom = ({selected,setSelected, onClose}) => {

  return (
    <div className="flex w-full flex-col">
      <Card>
        <CardBody>

          <DragAndDropApp
            onClose={onClose}
          />
        </CardBody>
      </Card>


    </div>
  );
}

export default TabOperationsCustom;