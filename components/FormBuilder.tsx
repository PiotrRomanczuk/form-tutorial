'use client';
import React, { useState } from 'react';

interface FormElement {
	type: string;
	id: number;
	label: string;
}

export const FormBuilder: React.FC = () => {
	const [formElements, setFormElements] = useState<FormElement[]>([]);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const handleDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		elementType: string
	) => {
		e.dataTransfer.setData('application/json', JSON.stringify({ elementType }));
		setIsDragging(true);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		const { elementType } = JSON.parse(
			e.dataTransfer.getData('application/json')
		);

		// Create a new form element based on the dropped type
		const newFormElement: FormElement = {
			type: elementType,
			id: new Date().getTime(),
			label: `Field ${formElements.length + 1}`,
		};

		setFormElements([...formElements, newFormElement]);
	};

	return (
		<div className='container mx-auto p-4 text-white'>
			<h1 className='text-3xl font-bold mb-4'>Form Builder</h1>

			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={`border ${
					isDragging ? 'border-dashed' : 'border-solid'
				} border-gray-400 p-4 min-h-[300px]`}
			>
				{formElements.map((element) => (
					<div key={element.id} className='mb-4'>
						<label className='block text-sm font-medium text-gray-600'>
							{element.label}
						</label>
						<input
							type={element.type}
							placeholder={element.label}
							className='mt-1 p-2 border border-gray-300 rounded-md w-full'
						/>
					</div>
				))}
			</div>

			<div className='mt-8'>
				<h2 className='text-2xl font-bold mb-4'>Available Elements</h2>
				<div
					draggable
					onDragStart={(e) => handleDragStart(e, 'text')}
					className='bg-blue-500 text-white p-2 cursor-move'
				>
					Text Input
				</div>
			</div>
		</div>
	);
};
