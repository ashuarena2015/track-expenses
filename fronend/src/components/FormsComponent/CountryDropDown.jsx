import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { countries } from '../FormsComponent/Countries';

export default function CountryDropDown(props) {
    const { className, value, handleChange } = props;
    const [selectedCountry, setSelectedCountry] = useState(null);

    return (
        <div className="card flex justify-content-center">
            <Dropdown
                name="country"
                onChange={handleChange}
                value={value}
                options={countries}
                optionLabel="name"
                placeholder="Select a Country" 
                className={className}
                dropdownIcon={(opts) => {
                    return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                }}/>
        </div>    
    )
}
        