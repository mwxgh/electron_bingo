import React from 'react'
import { Modal, Form, Input, FormInstance } from 'antd'
import Button from '@/components/Button'
import './style.css'
import { User } from '@/types/common/database'

interface Props {
  title: string
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  form: FormInstance
  onSubmit: (data: User) => void
}

const UserForm: React.FC<Props> = ({
  title,
  isOpen,
  setIsOpen,
  onSubmit,
  form,
}) => {
  const onFinish = (data: User) => {
    onSubmit(data)
    form.resetFields()
    setIsOpen(false)
  }

  const handleClose = () => {
    form.resetFields()
    setIsOpen(false)
  }

  return (
    <Modal
      title={
        <div className="text-xl text-center bg-transparent text-white">
          {title}
        </div>
      }
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={500}
      className="p-0"
      centered
    >
      {isOpen && (
        <Form
          name="basic"
          layout="vertical"
          size="large"
          className="mt-[15px]"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item<User>
            label={<span className="text-lg text-white">Mã nhân viên</span>}
            name="code"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label={<span className="text-lg text-white">Họ và tên</span>}
            name="name"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label={<span className="text-lg text-white">Xưởng</span>}
            name="factory"
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label={<span className="text-lg text-white">Công việc</span>}
            name="position"
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button
              color="info"
              onClick={() => {
                setIsOpen(true)
              }}
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default UserForm
