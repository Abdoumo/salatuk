import { Table } from 'antd';
import React , {useContext} from 'react'
import { AppContext } from '../App';

const TableComponent = () => {
    const { data } = useContext(AppContext)
    let dataSource = [];
    if(data['timings']){

        Object.keys(data['timings']).map(ele => {
            dataSource.push({
                key: ele,
                Salat: ele,
                Time: data['timings'][ele]
            })
        })
    }
    let DATE = ''
    if(data['date']){
        var hijri = data['date']['hijri']
        DATE = `${hijri['weekday']['en']} ${hijri['day']} ${hijri['month']['en']} ${hijri['year']}`
    }
      const columns = [
          {
              title: 'Salat',
              dataIndex: 'Salat',
              key: 'Salat',
            },
            {
              title: 'Time',
              dataIndex: 'Time',
              key: 'Time',
            },
      ];
  return (
    <div style={{margin: '25px'}} >
        <h1> {DATE} </h1>
      <Table dataSource={dataSource} columns={columns} />

    </div>
  )
}

export default TableComponent
