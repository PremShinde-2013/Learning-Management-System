import React, { useState } from "react";
import SignInModal from "./signin";
import SignUpModal from "./signup";
import VerificationModal from "./verification"; // Import the VerificationModal

interface Props {
	onClose: () => void;
}

const Authentication: React.FC<Props> = ({ onClose }) => {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(true);
	const [showVerification, setShowVerification] = useState(false); // Add state for verification modal

	const toggleSignInModal = () => {
		setIsSignInModalOpen(true);
		setShowVerification(false); // Ensure verification modal is not shown
	};

	const toggleSignUpModal = () => {
		setIsSignInModalOpen(false);
		setShowVerification(false); // Ensure verification modal is not shown
	};

	const toggleVerificationModal = () => {
		setShowVerification(!showVerification); // Toggle verification modal
	};

	return (
		<>
			{isSignInModalOpen ? (
				<SignInModal onClose={onClose} toggleSignUpModal={toggleSignUpModal} />
			) : (
				<SignUpModal onClose={onClose} toggleSignInModal={toggleSignInModal} />
			)}

			{/* Show verification modal if state is true */}
			{showVerification && (
				<VerificationModal
					onClose={onClose}
					toggleSignInModal={toggleSignInModal}
				/>
			)}
		</>
	);
};

export default Authentication;
