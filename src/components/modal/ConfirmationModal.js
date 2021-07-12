import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export const ConfirmationModal = ({open, setOpen, doSubmit, myRef}) => {
    return (
        <div ref={myRef}>
            <Modal
                show={open}
                onHide={() => setOpen(false)}
            >
                <Modal.Header className="font-weight-bold">Buy coins</Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to buy these coins?</p>
                    <p>
                        <span className="font-weight-bold">Coin Id: </span>
                        <span></span>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => doSubmit()}>Buy</Button>
                    <Button variant="warning" onClick={() => setOpen(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )


}


