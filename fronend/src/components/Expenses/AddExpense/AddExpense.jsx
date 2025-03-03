import React, { useState, memo } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import FormInput from '../../FormsComponent/FormInput';
import { Calendar } from 'primereact/calendar';
        

const ModalComponent = ({ displayModal, setShowForm, dispatch, setFetchExpenseData, loginUser }) => {

    console.log({loginUser});

  
    const [formSubmit, setFormSubmit] = useState(false);
    const [formData, setFormData] = useState({
          description: '',
          amount: '',
		  date: ''
      });

      const handleSubmit = async () => {
        console.log({formData});
        setFormSubmit(true);
        const response = await dispatch({
            type: 'apiRequest',
            payload: {
                url: `user/add-expense`,
                method: 'POST',
                onSuccess: 'users/addExpense',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'addExpense',
                params: {
                    ...formData,
                    userId: loginUser?._id
                }
            }
        });
        console.log({response});
        if(response?.addExpense) {
            setFetchExpenseData(true);
            setShowForm(false);
        }
    };

    const isErrorInput = (inputName) => {
      return formSubmit && !formData[inputName];
  }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

	const handleChangeDate = (value) => {
		const dateStr = new Date(value);
		setFormData({
            ...formData,
            date: new Date(dateStr).getTime()
        })
	}

	const footerContent = (
		<div>
			<Button label="Cancel" icon="pi pi-times" onClick={() => setShowForm(false)} className="p-button-text" />
			<Button label="Add" icon="pi pi-check" onClick={handleSubmit} />
		</div>
	);

  return (
    <div className="card flex justify-content-center">
      <Dialog header="Add Expense" visible={displayModal} style={{ width: '30vw' }} onHide={() => {if (!displayModal) return; setShowForm(false); }} footer={footerContent}>
      	<div className="flex align-items-center">
            <div className='formgrid grid'>
                <div className='field col'>
                    <label htmlFor="date" className="block text-900 font-medium mb-2">Date</label>
					<Calendar name="date" value={''} onChange={(e) => handleChangeDate(e.target.value)} />
                </div>
                <div className='field col'>
                    <label htmlFor="amount" className="block text-900 font-medium mb-2">Amount</label>
                    <FormInput
                        label="Amount"
						type="number"
                        name="amount"
                        value={formData?.amount}
                        placeholder="200"
                        handleChange={handleChange}
                        isError={isErrorInput('amount')}
                        className="w-full mb-3"
                    />
                </div>
            </div>
        </div>
		<div className="flex align-items-center">
			<div className='formgrid w-full'>
				<div className='field w-full'>
					<label htmlFor="description" className="block text-900 font-medium mb-2">Description</label>
					<FormInput
						label="Description"
						name="description"
						value={formData?.description}
						placeholder="Description"
						handleChange={handleChange}
						isError={isErrorInput('description')}
						className="w-full mb-3"
					/>
				</div>
			</div>
		</div>
      </Dialog>
    </div>
  );
}

export default memo(ModalComponent);