"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone, FileRejection } from "react-dropzone";
import { X } from "lucide-react";

interface DropzoneProps {
	className?: string;
}

const Dropzone = ({ className }: DropzoneProps) => {
	const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const [rejected, setRejected] = useState<FileRejection[]>([]);

	const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
		if (acceptedFiles?.length) {
			//	console.log(acceptedFiles);
			setFiles((previousFiles) => [...previousFiles, ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))]);
		}

		if (rejectedFiles?.length) {
			setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
		maxSize: 1024 * 1000,
	});
	const removeFile = (name: string) => {
		setFiles((files) => files.filter((file) => file.name !== name));
	};
	const removeRejected = (name: string) => {
		setRejected((files) => files.filter(({ file }) => file.name !== name));
	};

	return (
		<form>
			<div {...getRootProps({ className: className })}>
				<input {...getInputProps()} />
				{isDragActive ? <p>Drop the files here ...</p> : <p>Drag &apos;n&apos; drop some files here, or click to select files</p>}
			</div>

			{/* {Accepted files} */}
			<h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">Accepted Files</h3>
			<ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
				{files.map((file) => (
					<li key={file.name} className="relative h-32 rounded-md shadow-lg">
						<Image
							src={file.preview}
							alt={file.name}
							width={500}
							height={100}
							onLoad={() => {
								URL.revokeObjectURL(file.preview);
							}}
							className="h-full w-full object-contain rounded-md"
						/>
						<button
							title="Remove file"
							type="button"
							className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
							onClick={() => removeFile(file.name)}
						>
							<X className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
						</button>
					</li>
				))}
			</ul>

			{/* Rejected Files */}
			<h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">Rejected Files</h3>
			<ul className="mt-6 flex flex-col">
				{rejected.map(({ file, errors }) => (
					<li key={file.name} className="flex items-start justify-between">
						<div>
							<p className="mt-2 text-neutral-500 text-sm font-medium">{file.name}</p>
							<ul className="text-[12px] text-red-400">
								{errors.map((error) => (
									<li key={error.code}>{error.message}</li>
								))}
							</ul>
						</div>
						<button
							type="button"
							className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
							onClick={() => removeRejected(file.name)}
						>
							remove
						</button>
					</li>
				))}
			</ul>
		</form>
	);
};
export default Dropzone;
