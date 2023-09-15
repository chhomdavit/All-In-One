import { Button,  Form, Image, Input,  Modal, Space} from "antd"
import React from "react";

const ModalForm = ({
    open=false,
    title=null,
    footer=null,
    onCancel,
    onOk,
    onFinish,
    onChangeFile,
    items,
    pictures,
}) => {
    const [form] = Form.useForm() 

    React.useEffect(()=>{
        if(items != null){
            form.setFieldsValue({
                product_name : items.product_name,
            })
        }
    },[items])

    const handleCancel = () => {
        form.resetFields() // clear data in form
        onCancel()
    }
    return (
        <Modal
            open={open}
            title={title}
            onCancel={handleCancel}
            onOk={onOk}
            footer={footer}
            maskClosable={false}
            width={"50%"}
            
        >
            <Form
                encType="multipart/form-data"
                form={form}
                name="form_product"
                layout='vertical'
                onFinish={(item) => {
                    form.resetFields()
                    onFinish(item)
                }}
            >

                <Form.Item
                    label="Name"
                    name={"product_name"}
                    rules={[{ required: true, message: 'Please fill in name' }]}>
                    <Input placeholder="Name" />
                </Form.Item>

                <Form.Item
                    name={'images'}>
                    <Input
                        type='file'
                        multiple={true}
                        onChange={onChangeFile}
                    />
                    <br />
                    <div>
                        {pictures && pictures.map((picture, index) => (
                            <Image key={index} 
                            src={picture} alt="Image preview" />
                        ))}
                    </div>
                </Form.Item>

                <Form.Item style={{ textAlign: 'right' }}>
                    <Space>
                        <Button type="primary" htmlType="submit">{items !=null ? 'Update': 'Save'}</Button>
                        <Button onClick={() => {
                            form.resetFields()
                            onCancel()}}
                        >
                            Cancel
                        </Button>

                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalForm;