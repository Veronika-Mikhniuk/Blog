import { useState, useRef, useEffect } from 'react'
import Modal from 'bootstrap/js/dist/modal';

export function useModal(ref, isShown, onClose = () => { }) {
    const [modalInstance, setModalInstance] = useState(null) // Added modal instance in state

    useEffect(() => {
        setModalInstance(Modal.getOrCreateInstance(ref.current))

        ref.current.addEventListener('hidden.bs.modal', onClose)

        return () => {
            ref.current?.removeEventListener('hidden.bs.modal', onClose);
            modalInstance?.dispose();
        }
    }, [ref])

    useEffect(() => {
        if (!modalInstance) return

        if (isShown) {
            show()
        } else {
            hide()
        }
    }, [isShown, modalInstance, show, hide])

    function show() {
        modalInstance.show()
    }

    function hide() {
        modalInstance.hide()
    }

    return {
        modalInstance,
        show,
        hide
    }
}