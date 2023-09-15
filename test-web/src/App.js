import {useState,useEffect} from 'react';
import {request} from "./util/api";
import {Image ,Table} from "antd";
import { Config } from './util/service';
import './App.css';

function App() {
  const [listUser, setListUser] = useState([]);
 
  useEffect(()=>{
    getList();
  },[])

  const getList = () => {
    request('get', '/users', {}).then(res => {
      if (res.status === 200) {
        var data = res.data
        console.log(data)
        setListUser(data)
      }
    })
  }

  return (
    <>
      <Table
        dataSource={listUser}
        columns={[
          {
            title: "No",
            render: (value, record, index) => (index + 1)
          },
          {
            title: "firstName",
            dataIndex: "firstName",
            key: "firstName"
          },
          {
            title: "lastName",
            dataIndex: "lastName",
            key: "lastName"
          },
          {
            title: "email",
            dataIndex: "email",
            key: "email"
          },
          {
            title: "avatar",
            key: "avatar",
            dataIndex: 'avatar',
            render: (item) => {
              return (
                <Image
                  width={80}
                  height={60}
                  src={Config.imagePath + item}
                  alt={item}
                />
              )
            }
          }
        ]}
      />
    </>
  );
}

export default App;
