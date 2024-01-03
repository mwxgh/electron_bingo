import Button from '@/components/Button'
import { getSettingApp, saveSettingApp } from '@/service/localStorage'
import { Setting as TSetting } from '@/types/common/database'
import { Form, InputNumber, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'

const Setting = () => {
  const [form] = useForm()
  const [api, contextHolder] = notification.useNotification()

  const fetchAppSetting = () => {
    const settings = getSettingApp()
    form.setFieldsValue(settings)
  }

  useEffect(() => {
    fetchAppSetting()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnSaveSetting = (data: TSetting) => {
    try {
      saveSettingApp(data)

      api.success({
        message: 'Lưu tùy chỉnh thành công',
        duration: 2,
      })
    } catch (error) {
      api.error({
        message: 'Lưu tùy chỉnh thất bại',
        duration: 2,
      })
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      {contextHolder}
      <span className="text-4xl font-semibold mb-[50px]">Tùy chỉnh</span>

      <div className="flex justify-center">
        <Form
          name="basic"
          layout="vertical"
          style={{ width: 300 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          className="flex flex-col justify-center"
          onFinish={handleOnSaveSetting}
          form={form}
        >
          <Form.Item
            label={
              <span className="text-2xl font-medium text-[#475569]">
                Số lượng câu hỏi tối thiểu
              </span>
            }
            name="minQuantityQuestion"
            rules={[{ required: true }]}
            className="mb-[50px]"
          >
            <InputNumber
              type="number"
              min={1}
              max={100}
              className="w-full text-xl text-[#475569]"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-2xl font-medium text-[#475569]">
                Số lượng câu hỏi tối đa
              </span>
            }
            name="maxQuantityQuestion"
            rules={[{ required: true }]}
          >
            <InputNumber
              type="number"
              min={1}
              max={100}
              className="w-full text-xl text-[#475569]"
            />
          </Form.Item>
          <div className="relative">
            <Form.Item
              label={
                <span className="text-2xl font-medium text-[#475569]">
                  Thời gian chuyển câu hỏi
                </span>
              }
              name="questionBreakTime"
              rules={[{ required: true }]}
              className="mb-[50px]"
            >
              <InputNumber
                type="number"
                min={100}
                max={10000}
                step={100}
                className="w-full text-xl text-[#475569]"
              />
            </Form.Item>
            <span className="absolute top-1/2 -translate-y-1/2 right-[-35px] text-xl">
              ms
            </span>
          </div>

          <Form.Item className="flex justify-center">
            <Button color="info">Lưu</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Setting
