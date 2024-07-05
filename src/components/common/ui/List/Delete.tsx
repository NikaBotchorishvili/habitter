import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type DeleteProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Delete: React.FC<DeleteProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <dialog
          className=" flex flex-col gap-y-3 text-darkModeWhite z-50 max-w-sm w-full p-5 rounded-lg dark:bg-darkModeMain"
          open
        >
          <FontAwesomeIcon
            icon={faX}
            onClick={onClose}
            className="self-end cursor-pointer size-[25px]"
          />
          <small>Are you sure you want to delete this item?</small>
          <button onClick={() => { /* handle delete action */ onClose(); }}>Confirm</button>
        </dialog>
      )}
    </>
  );
};

export default Delete;