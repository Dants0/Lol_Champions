import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

import styles from './styles.module.scss'
import { removeTags } from '../../utils/removeTags'

export default function ModalUnique({ title, description, id, image  }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className={styles.containerModal}>
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/passive/${image}`}
                alt="Spell Image"
                className="logoSpells"
                key={id}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className={styles.modalContent}>
                    <div className={styles.wrapperHeaderAndCloseButton}>
                        <ModalHeader>
                            <p>
                                {title}
                            </p>
                        </ModalHeader>
                        <ModalCloseButton className={styles.btnClose} />
                    </div>
                    <ModalBody>
                        {description ? removeTags(description):''}
                    </ModalBody>
                </ModalContent>
            </Modal>

        </div>
    )
}