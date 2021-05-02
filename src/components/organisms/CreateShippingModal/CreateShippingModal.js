import React from "react";
import { useOrdersContext } from "../../../contextApi/OrdersContext";
import ModalContainer from "../../moleculas/ModalContainer";

export default function CreateTrackingId(props) {
  const {
    openModalCreateShipping,
    orderToShipping,
    orderPackageShipping,
    orderPackages,
    setOrderPackageShipping,
    handleOpenModalCreateShipping,
  } = useOrdersContext();
  return (
    <ModalContainer
      open={openModalCreateShipping}
      onClose={() => {}}
      title="Generar guía"
      maxWidth="lg"
    ></ModalContainer>
  );
}
