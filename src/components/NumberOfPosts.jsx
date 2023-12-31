import React from 'react'
import { MySelect } from './UI/select/MySelect'

export const NumberOfPosts = ({ limit, setLimit, observe, setPage }) => {
    return (
        <>
            {observe
                ?
                void 0
                :
                <div className="select-number__wrapper">
                    <MySelect
                        options={
                            [
                                { value: 5, name: 5 },
                                { value: 10, name: 10 },
                                { value: 15, name: 15 },
                                { value: 20, name: 20 },
                                { value: 25, name: 25 },
                                { value: -1, name: 'все' }
                            ]
                        }
                        defaultValue='количество постов'
                        value={limit}
                        onChange={value => {
                            setPage(1)
                            setLimit(value)
                        }}

                    />
                </div>
            }
        </>

    )
}
