import React from 'react'

export default function NoteLabel({ value, className = ''

}: any) {
    return (
        <p className={
            `block text-xs text-gray-500 ` +
            className
        }>
            {value}
        </p>
    )
}
