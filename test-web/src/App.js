import {useState,useEffect} from 'react';
import {request} from "./util/api";
import {Image ,Table, Button, Modal, Form, Input, Upload, Space, Popconfirm} from "antd";
import { DeleteFilled, EditFilled, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Config } from './util/service';
import './App.css';

function App() {
	const [list, setList] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading,setLoading] = useState(false)
	const [form] = Form.useForm();
	const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [imgFile, setImgFile] = useState(null)
    const [items, setItems] = useState(null)

	const getBase64 = (file) =>
	  new Promise((resolve, reject) => {
	    const reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => resolve(reader.result);
	    reader.onerror = (error) => reject(error);
	 });
  
	const showModal = () => {
	    setIsModalOpen(true);
	};
	const handleOk = () => {
	    setIsModalOpen(false);
	};
	const handleCancel = () => {
	    setIsModalOpen(false);
	    form.resetFields();
    	setItems(null)
	};
	
	const handleChange = ({ fileList: newFileList }) =>{ 
    	setFileList(newFileList)
    };
    
    const handlePreview = async (file) => {
	    if (!file.url && !file.preview) {
	      file.preview = await getBase64(file.originFileObj);
	    }
	    setPreviewImage(file.url || file.preview);
	    setPreviewOpen(true);
	    setImgFile(URL.createObjectURL(file.target.files[0]))
	 };

	useEffect(() => {
		getList();
	}, [])

	const getList = () => {
		request('get', '/all', {}).then(res => {
			if (res.status === 200) {
				var data = res.data
				console.log(data)
				setList(data)
			}
		})
	}
	
	const uploadButton = (
	    <div>
	      <PlusOutlined />
	      <div
	        style={{
	          marginTop: 8,
	        }}
	      >
	        Upload
	      </div>
	    </div>
	  );
	
		const onFinish = (item) => {
	    setLoading(true);
	    setIsModalOpen(false);
	    
	    var form = new FormData();
	    form.append("title", item.title);
	    form.append("studio", item.studio);
	    form.append("releaseYear", item.releaseYear);
	    form.append("director", item.director);
	    form.append("movie_cast", item.movie_cast);
	    if (fileList.length > 0 && fileList[0].originFileObj !== null) {
        	form.append("file", fileList[0].originFileObj);
    	}
    	
	    var method = "post";
	    var url = "/add-movie";
	    getList();
	    if (items !== null) {
	        method = "put";
	        url = "/update/" + items.movieId; 
	    }
		request(method, url, form).then(res => {
		        if (res.status === 200) {
		            getList();
		            setItems(null);
		            setFileList([]);
		        }
		    });
        };


	const onClickDelete = (id) => {
    console.log(id)
    setIsModalOpen(false);
    setLoading(true)
    request('delete', `/delete/${id}`, {}).then(res => {
        setLoading(false)
        if(res.status === 200){
            getList();
        }
    }).catch(error => {
        console.error(error);
        setLoading(false)
    })
    }
	  
	  const  onClickEdit = (param)=>{
	    setItems(param)
	    setIsModalOpen(true);
	    form.setFieldsValue({
			
        title: param.title,
        director: param.director,
        studio: param.studio,
        releaseYear: param.releaseYear,
        movie_cast: param.movie_cast,
        
        });
        setFileList([]);
	  }

	return (
		<>
			 <Button type="primary" onClick={showModal} style={{ margin: 20 }}>
				  Create New
			 </Button>
				
				<Modal 
					title={items == null ? "Create New" :  "Update"} 
					open={isModalOpen} 
					onOk={handleOk} 
					footer={null} 
					onCancel={()=>{form.resetFields() 
					               handleCancel()
					               }}
				>
				  <Form form={form}  
				  		onFinish={(item)=>{ 
					  	form.resetFields()
					  	onFinish(item) }}   
				  		layout="vertical"
				  >
				  
				    <Form.Item label="Title Name" name={"title"}>
				      <Input placeholder="Enter title name" />
				    </Form.Item>
				    
				    <Form.Item label="director Name" name={"director"}>
				      <Input placeholder="Enter title director" />
				    </Form.Item>
				    
				    <Form.Item label="studio Name" name={"studio"}>
				      <Input placeholder="Enter studio name" />
				    </Form.Item>
				    
				    <Form.Item label="releaseYear Name" name={"releaseYear"}>
				      <Input placeholder="Enter releaseYear name" />
				    </Form.Item>
				    
				    <Form.Item label="poster Name" name={"poster"}>
					  <Upload
					    action="/upload-endpoint" 
					    name="file"  
					    listType="picture-card"
					    fileList={fileList}
					    onPreview={handlePreview}
					    onChange={handleChange}
					  >
					    {fileList.length >= 1 ? null : uploadButton}
					  </Upload>
					</Form.Item>
				    
				    <Form.Item label="movie_cast Name" name={"movie_cast"}>
				      <Input placeholder="Enter movie_cast name" />
				    </Form.Item>
				    
				    <Form.Item style={{ textAlign:'right' }}>
			            <Space>
			                <Button danger onClick={handleCancel}>
			                    Cancel
			                </Button>
			                <Button htmlType='submit'>
			                  {items != null ? "Update" : "Save"}
			                </Button>
			            </Space>
			        </Form.Item>
				    
				  </Form>
                </Modal>
		     
				<Table
				dataSource={list}
				columns={[
					{
						title: "No",
						render: (item, items, index) => (index + 1)
					},
					{
						title: "title",
						dataIndex: "title",
						key: "title"
					},
					{
						title: "director",
						dataIndex: "director",
						key: "director"
					},
					{
						title: "studio",
						dataIndex: "studio",
						key: "studio"
					},
					{
						title: "releaseYear",
						dataIndex: "releaseYear",
						key: "releaseYear"
					},
					{
						title: "image",
						key: "image",
						dataIndex: 'poster',
						render: (item, items, index) => {
							return (
								<Image
									width={80}
									height={60}
									src={Config.imagePath + item}
									alt={item}
								/>
							)
						}
					},
					{
						title: "movie_cast",
						dataIndex: "movie_cast",
						key: "movie_cast",
						render: (movie_cast) => {
							if (typeof movie_cast === 'string') {
								const castArray = movie_cast.split(', ');
								return castArray.join(", ");
							}
							return movie_cast.join(", ");
						}
					},
					{
			          title : "Action",
			          key: "Action",
			          render: (item,items,index)=>{
			            return(
			              <Space>	
						  	<Popconfirm
				                  placement="topLeft"
				                  title={"Delete"}
				                  description={"Are sure to romove!"}
				                  onConfirm={()=>onClickDelete(items.movieId)}
				                  okText="Yes"
				                  cancelText="No"
			                >
                  			<Button  danger size="small"><DeleteFilled/>Detele</Button>
                			</Popconfirm>
			                <Button size="small" onClick={()=>onClickEdit(items)}><EditFilled/>Edit</Button>
			              </Space>
			            )
			          }
			        },
				]}
			    />
	</>
	);
}

export default App;
