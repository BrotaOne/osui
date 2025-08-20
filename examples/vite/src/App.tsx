import { useState } from 'react'
import './App.css'
import {Input, Table, Button, BrandProvider, Card} from '@osui/ui'

const columns = [
    { title: 'name', dataIndex: 'name', },
    {
        title: 'age', dataIndex: 'age',
        sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
    }
];

const dataSource = [
  { name: 'jack', age: 10 },
  { name: 'anna', age: 30 },
  { name: 'bob', age: 20 }
];

const customizeTheme = {
    cssVar: true
};

function App() {
  const [count, setCount] = useState(0);

    const add = () => setCount(v => v + 1);

    return (
        <BrandProvider theme={customizeTheme}>
            <Card style={{width: '100vw'}}>
                <Button type="primary" onClick={add}>count: {count}</Button>
                <Input style={{ margin: 10 }} />
                <Table dataSource={dataSource} columns={columns} />
            </Card>
        </BrandProvider>
    );
}

export default App
