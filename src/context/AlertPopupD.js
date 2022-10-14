import Popup from "reactjs-popup";

const AlertPopUpD = ({
    open,
    closeModal,
    children
}) => {

    return (
        <Popup open={open} onClose={closeModal}>
            <div>
                <a className="close" onClick={closeModal}>
                    &times;
                </a>
                {children}
            </div>
        </Popup>
    )
}

export default AlertPopUpD;
