import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModalComponent from './AddExpense';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const Expenses = () => {

    const dispatch = useDispatch();
    const { expenses } = useSelector(state => state.usersReducer);
    const { message: globalMessage, msgType } = useSelector(state => state.globalReducer)

    const [messageVariant, setMessageVariant] = useState(msgType);

    const [offset, setOffset] = useState(0);
    const limit = 2;

    useEffect(() => {
        setMessageVariant(msgType === 'error' ? 'danger' : msgType);
    }, [msgType])
    
    useEffect(() => {
        dispatch({
            type: 'apiRequest',
            payload: {
                url: `user/expenses`,
                method: 'GET',
                onSuccess: 'users/getExpenses',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'getExpenses',
                params: {
                    limit,
                    offset
                }
            }
        });
    }, [offset]);

    const [allExpenses, setAllExpenses] = useState([]);

    const getExpensesInfo = (expenses) => {
        let allExpensesInfo = [];
        expenses.map((expense, i) => {
            allExpensesInfo.push(expense);
        })
        return allExpensesInfo;
    }

    useEffect(() => {
        setAllExpenses(getExpensesInfo(expenses));
    }, [expenses]);

    const onRowEditComplete = (e) => {
        console.log(e);
    };

    const textEditor = (options) => {
        if(options?.field === 'date') {
            return <Calendar value={options?.value} onChange={(e) => options.editorCallback(e.target.value)} />
        }
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };

    const [showForm, setShowForm] = useState(false);

    const showModalForm = () => {
        setShowForm(true);
    }

    const headerTemplate = (data) => {
        if(!data?.length) return;
        const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
        return (
            <div className="flex align-items-center gap-2">
                <span className="font-bold">Total amount: {totalAmount}</span>
            </div>
        );
    };

    return (
        <>
            <div className="flex justify-content-between flex-wrap mb-4">
                <div className="text-2xl align-items-center line-height-4">Expenses</div>
                <Button onClick={showModalForm} label="Add Expense" icon="pi pi-plus" className="p-button-primary" />
            </div>
            <ModalComponent setShowForm={setShowForm} dispatch={dispatch} displayModal={showForm} />
            <DataTable
                value={allExpenses}
                editMode="row"
                dataKey="id"
                onRowEditComplete={onRowEditComplete}
                tableStyle={{ minWidth: '50rem' }}
                rowGroupMode="subheader"
                groupRowsBy="representative.name"
                sortMode="single"
                sortField="representative.name"
                sortOrder={1}
                scrollable
                scrollHeight="600px"
                rowGroupHeaderTemplate={headerTemplate(allExpenses)}
                // rowGroupFooterTemplate={footerTemplate}

            >
                <Column field="date" header="Date" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="description" header="Description" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="amount" header="Amount" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </>
    )
}

export default Expenses;
