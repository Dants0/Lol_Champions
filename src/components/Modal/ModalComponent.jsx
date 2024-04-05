import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

import styles from './styles.module.scss'

export default function ModalComponent({ props }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className={styles.containerModal}>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/${props.id}.png`}
        alt="Imagem da spell"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className={styles.modalContent}>
          <div className={styles.wrapperHeaderAndCloseButton}>
            <ModalHeader>
              <p>
                {props.name}
              </p>
            </ModalHeader>
            <ModalCloseButton className={styles.btnClose} />
          </div>
          <ModalBody>
            {props.description}
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  )
}