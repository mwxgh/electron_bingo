import React from 'react'
import { Modal, Form, Input, FormInstance, Select, InputNumber } from 'antd'
import Button from '@/components/Button'
import './style.css'
import { Test, typeLabels } from '@/types/common/database'

interface Props {
  title: string
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  form: FormInstance
  onSubmit: (data: Test) => void
}

const TestForm: React.FC<Props> = ({
  title,
  isOpen,
  setIsOpen,
  onSubmit,
  form,
}) => {
  const onFinish = (data: Test) => {
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
      title={<div className="text-xl text-center">{title}</div>}
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={500}
    >
      <div className="h-[1px] bg-slate-400 mt-[15px] w-[40%] mx-auto"></div>
      {isOpen && (
        <Form
          name="basic"
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
            label={<span className="text-lg ">Loại đề kiểm tra</span>}
            name="type"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Select>
              <Select.Option value="hear">{typeLabels.hear}</Select.Option>
              <Select.Option value="sight">{typeLabels.sight}</Select.Option>
              <Select.Option value="synthetic">
                {typeLabels.synthetic}
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<Test>
            label={<span className="text-lg ">Số câu hỏi</span>}
            name="quantity"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <InputNumber min={5} max={20} />
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
