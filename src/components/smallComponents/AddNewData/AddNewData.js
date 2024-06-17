import React from 'react'

export default function AddNewData() {
    return (
        <div className='w-50 d-flex justify-content-start align-items-center my-5'>
            <div className='d-flex justify-content-start align-items-center flex-column'>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">ESR</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <input type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <div className='cursorPointer theme-card-dark rounded-2'>
                        <p className='text-light m-0 px-3 py-1'>ADD</p>
                    </div>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">CRP</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <input type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <div className='cursorPointer theme-card-dark rounded-2'>
                        <p className='text-light m-0 px-3 py-1'>ADD</p>
                    </div>
                </div>
                <div className='cursorPointer theme-card-dark rounded-3 d-flex justify-content-start align-items-center'>
                    <span className="material-symbols-outlined text-light m-2">
                        add
                    </span>
                </div>
            </div>
        </div>
    )
}
