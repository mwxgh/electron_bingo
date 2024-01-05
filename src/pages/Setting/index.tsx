import Button from '@/components/Button'
import { getSettingApp, saveSettingApp } from '@/service/localStorage'
import { Setting as TSetting } from '@/types/common/database'
import { Form, InputNumber, Select, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef } from 'react'
import SoundIcon from '@/assets/svgs/sound.svg'
import { soundsSource } from '@/constants/common'

const Setting = () => {
  const [form] = useForm()
  const [api, contextHolder] = notification.useNotification()
  const isPlaying = useRef(false)

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

  const playSound = () => {
    if (!isPlaying.current) {
      isPlaying.current = true

      const audio = new Audio(soundsSource[form.getFieldValue('sound')])
      audio.play()

      setTimeout(() => {
        isPlaying.current = false
      }, 1000)
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
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  if (value < form.getFieldValue('maxQuantityQuestion')) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject()
                  }
                },
                message: 'Không thể lớn hơn hoặc bằng câu hỏi tối đa',
              },
            ]}
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
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  if (value > form.getFieldValue('minQuantityQuestion')) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject()
                  }
                },
                message: 'Không thể nhỏ hơn hoặc bằng câu hỏi tối thiểu',
              },
            ]}
            className="mb-[50px]"
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
          <div className="relative">
            <Form.Item
              label={
                <span className="text-2xl font-medium text-[#475569]">
                  Âm thanh
                </span>
              }
              name="sound"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Select>
                <Select.Option value={0}>1</Select.Option>
                <Select.Option value={1}>2</Select.Option>
                <Select.Option value={2}>3</Select.Option>
              </Select>
            </Form.Item>
            <span
              className="absolute top-[57%] -translate-y-1/2 right-[-30px] text-xl cursor-pointer"
              onClick={playSound}
            >
              <SoundIcon width={20} height={20} />
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
