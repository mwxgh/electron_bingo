import React, { useEffect } from 'react'
import { Modal, Form, Input } from 'antd'
import Button from '@/components/Button'
import './style.css'
import { useForm } from 'antd/lib/form/Form'
import { Test } from '@/types/common/database'

interface Props {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  onSubmit: (data: Test) => void
}

const TestForm: React.FC<Props> = ({ isOpen, setIsOpen, onSubmit }) => {
  const [form] = useForm()

  useEffect(() => {
    form.resetFields()
  }, [form, isOpen])

  const onFinish = (data: Test) => {
    onSubmit(data)
    form.resetFields()
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      title={<div className="text-xl text-center">Thêm đề kiểm tra</div>}
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={500}
    >
      <div className="h-[1px] bg-slate-400 mt-[15px] w-[40%] mx-auto"></div>
      {isOpen && (
        <Form
          name="basic"
          initialValues={{ remember: false }}
          autoComplete="off"
          layout="vertical"
          size="large"
          className="mt-[15px]"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item<Test>
            label={<span className="text-lg ">Tên đề kiểm tra</span>}
            name="name"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item<Test>
            label={<span className="text-lg ">Loại đề</span>}
            name="type"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item<Test>
            label={<span className="text-lg ">Số câu hỏi</span>}
            name="quantity"
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

export default TestForm
