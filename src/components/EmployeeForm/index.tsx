import React, { useEffect } from 'react'
import { Modal, Form, Input } from 'antd'
import Button from '@/components/Button'
import './style.css'
import { useForm } from 'antd/lib/form/Form'

interface Props {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

interface Employee {
  employeeCode: string
  name: string
  factory: string
  position: string
}

const EmployeeForm: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [form] = useForm()

  useEffect(() => {
    form.resetFields()
  }, [form, isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      title={<div className="text-xl text-center">Thêm nhân viên</div>}
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
        >
          <Form.Item<Employee>
            label={<span className="text-lg ">Mã nhân viên</span>}
            name="employeeCode"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item<Employee>
            label={<span className="text-lg ">Họ và tên</span>}
            name="name"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item<Employee>
            label={<span className="text-lg ">Xưởng</span>}
            name="factory"
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>

          <Form.Item<Employee>
            label={<span className="text-lg ">Công việc</span>}
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

export default EmployeeForm
