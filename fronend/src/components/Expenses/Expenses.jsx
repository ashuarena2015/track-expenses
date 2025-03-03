import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModalComponent from './AddExpense';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Paginator } from 'primereact/paginator';

const Expenses = () => {

    const toastMessage = useRef(null);

    const dispatch = useDispatch();
    const { expenses, expensesCount, totalExpenses, loginUser } = useSelector(state => state.usersReducer);

    const { message: globalMessage, msgType } = useSelector(state => state.globalReducer)

    const [fetchExpenseData, setFetchExpenseData] = useState(false);

    const [page, setPage] = useState(1);
    const limit = 1;

    const [first, setFirst] = useState(0);
    const onPageChange = (event) => {
        setFirst(event.first);
        setPage(event?.page + 1);
    };


    useEffect(() => {
        globalMessage && toastMessage.current.show({
            severity: msgType,
            detail: globalMessage
        })
    }, [globalMessage])

    const getExpenseData = () => {
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
                    page
                }
            }
        });
    }

    useEffect(() => {
        getExpenseData();
        setFetchExpenseData(false);
    }, [page, fetchExpenseData, showForm]);

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

    const onRowEditComplete = async (e) => {
        const date = new Date(e.newData?.date).getTime();
        const response = await dispatch({
            type: 'apiRequest',
            payload: {
                url: `user/update-expense`,
                method: 'PUT',
                onSuccess: 'users/updateExpense',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'updateExpense',
                params: {
                    ...e.newData,
                    date
                }
            }
        });
        if(response?.updated) {
            setFetchExpenseData(true);
        }
    };

    const [rowClick, setRowClick] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const textEditor = (options) => {
        if(options?.field === 'date') {
            return <Calendar placeholder={options?.value} value={options?.value} onChange={(e) => options.editorCallback(e.target.value)} />
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
        return (
            <div className="flex align-items-center gap-2">
                <span className="font-bold">Total amount: {totalExpenses}</span>
            </div>
        );
    };

    const amountBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(rowData.amount);
    };

    const amountEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
    };

    const handleDataDelete = async () => {
        let deleteIds = [];
        for(let k = 0; k < selectedProducts?.length; k++) {
            deleteIds.push(selectedProducts[k]?.id);
        }
        const response = await dispatch({
            type: 'apiRequest',
            payload: {
                url: `user/delete-expense`,
                method: 'DELETE',
                onSuccess: 'users/deleteExpense',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'deleteExpense',
                params: {
                    ids: JSON.stringify(deleteIds)
                }
            }
        });

        if(response?.deleted) {
            setFetchExpenseData(true);
        }
    }

    return (
        <>
            <Toast ref={toastMessage} />
            <div className="flex justify-content-between flex-wrap mb-4">
                <div className="text-2xl line-height-4">Expenses</div>
                <div>
                    <Button onClick={handleDataDelete} label="Delete Expense" icon="pi pi-times" visible={selectedProducts?.length !== 0} className="p-button-danger mr-2" />
                    <Button onClick={showModalForm} label="Add Expense" icon="pi pi-plus" className="p-button-primary" />
                </div>
            </div>
            <ModalComponent
                loginUser={loginUser}
                setShowForm={setShowForm}
                dispatch={dispatch}
                displayModal={showForm}
                setFetchExpenseData={setFetchExpenseData}
            />
            <DataTable
                value={allExpenses}
                editMode="row"
                dataKey="id"
                onRowEditComplete={onRowEditComplete}
                tableStyle={{ width: '1100px' }}
                rowGroupMode="subheader"
                groupRowsBy="representative.name"
                sortMode="single"
                sortField="representative.name"
                sortOrder={1}
                scrollable
                scrollHeight="600px"
                rowGroupHeaderTemplate={headerTemplate(allExpenses)}
                selectionMode={rowClick ? null : 'checkbox'}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="date" header="Date" editor={(options) => textEditor(options)} style={{ width: '10%' }}></Column>
                <Column field="description" header="Description" editor={(options) => textEditor(options)} style={{ width: '45%' }}></Column>
                <Column field="amount" body={amountBodyTemplate} header="Amount" editor={(options) => amountEditor(options)} style={{ width: '25%' }}></Column>
                <Column rowEditor={allowEdit} headerStyle={{ width: '20%', minWidth: '2rem' }} bodyStyle={{ textAlign: 'right' }}></Column>
            </DataTable>
            {expensesCount > limit ?
                <Paginator
                    first={first}
                    rows={limit}
                    totalRecords={expensesCount}
                    onPageChange={onPageChange}
                    template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }}
                    className="mt-2"
                />
            : null}
        </>
    )
}

export default Expenses;
