import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, FormInstance, Select, InputNumber } from 'antd'
import Button from '@/components/Button'
import './style.css'
import { Setting, Test, TestDetail, typeLabels } from '@/types/common/database'
import { colorCodePalette } from '@/constants/common'
import EyeIcon from '@/assets/svgs/eye.svg'
import EarIcon from '@/assets/svgs/ear.svg'
import { getSettingApp } from '@/service/localStorage'

interface Props {
  title: string
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  form: FormInstance
  onSubmit: (data: Test) => void
  isCreate: boolean
}

interface QuestionDetailProps {
  detail: TestDetail
  index: number
  onChange: (value: Partial<TestDetail>) => void
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({
  detail,
  index,
  onChange,
}) => {
  return (
    <div className="flex items-center mb-[15px]">
      <p className="mr-[15px]">Câu {index + 1}:</p>
      <div className="mr-[15px]">
        {detail.type === 'sight' ? (
          <EyeIcon width="30" height="30" />
        ) : (
          <EarIcon width="30" height="30" />
        )}
      </div>
      <div className="w-[170px] mr-[10px]">
        <Select
          defaultValue={detail.key}
          disabled={detail.key === 'Enter'}
          onChange={(value) => {
            onChange({
              key: value,
            })
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <Select.Option value={item.toString()}>
              {item.toString()}
            </Select.Option>
          ))}
        </Select>
      </div>
      {detail.value !== 'sound' && (
        <div className="w-[120px]">
          <Select
            defaultValue={detail.value}
            onChange={(value) => {
              onChange({
                value,
              })
            }}
          >
            {colorCodePalette.map((item) => (
              <Select.Option value={item.hex}>
                <div
                  className="w-[75px] h-[20px]"
                  style={{
                    background: item.hex,
                  }}
                ></div>
              </Select.Option>
            ))}
          </Select>
        </div>
      )}
    </div>
  )
}

const TestForm: React.FC<Props> = ({
  title,
  isOpen,
  setIsOpen,
  onSubmit,
  form,
  isCreate,
}) => {
  const [appSetting, setAppSetting] = useState<Partial<Setting>>({
    minQuantityQuestion: 1,
    maxQuantityQuestion: 100,
  })

  const fetchAppSetting = async () => {
    const settings = getSettingApp()

    setAppSetting({
      minQuantityQuestion: settings.minQuantityQuestion ?? 1,
      maxQuantityQuestion: settings.maxQuantityQuestion ?? 100,
    })
  }

  useEffect(() => {
    fetchAppSetting()
  }, [])

  const onFinish = (data: Test) => {
    onSubmit(data)
    setIsOpen(false)
  }

  const handleClose = () => {
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
          <Form.Item
            label={<span className="text-lg ">Tên đề kiểm tra</span>}
            name="name"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="text-lg ">Loại đề kiểm tra</span>}
            name="type"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <Select disabled={!isCreate}>
              <Select.Option value="hear">{typeLabels.hear}</Select.Option>
              <Select.Option value="sight">{typeLabels.sight}</Select.Option>
              <Select.Option value="synthetic">
                {typeLabels.synthetic}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<span className="text-lg ">Số câu hỏi</span>}
            name="quantity"
            rules={[{ required: true }]}
            className="mb-[30px]"
          >
            <InputNumber
              type="number"
              min={appSetting.minQuantityQuestion}
              max={appSetting.maxQuantityQuestion}
              disabled={!isCreate}
            />
          </Form.Item>

          {!isCreate && (
            <Form.Item
              label={<span className="text-lg ">Chi tiết câu hỏi</span>}
              name="details"
              rules={[{ required: true }]}
              className="mb-[30px]"
            >
              <div className="h-[180px] overflow-y-scroll px-[15px] pt-[15px] border-[1px] border-slate-200 rounded-lg">
                {form
                  .getFieldValue('details')
                  .map((item: TestDetail, index: number) => {
                    const handleOnChange = (value: Partial<TestDetail>) => {
                      const newDetailData = [...form.getFieldValue('details')]
                      newDetailData[index] = {
                        ...item,
                        ...value,
                      }

                      form.setFieldValue('details', newDetailData)
                    }

                    return (
                      <QuestionDetail
                        key={index}
                        index={index}
                        detail={item}
                        onChange={handleOnChange}
                      />
                    )
                  })}
              </div>
            </Form.Item>
          )}

          <Form.Item className="flex justify-center">
            <Button color="info">Xác nhận</Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default TestForm
