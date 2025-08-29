import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type CallType = 'video' | 'audio' | null;

interface AudioVideoCallContextType {
    isCallOpen: boolean;
    callType: CallType;
    physicianName: string;
    physicianAvatar?: string;
    startVideoCall: (name?: string, avatar?: string) => void;
    startAudioCall: (name?: string, avatar?: string) => void;
    endCall: () => void;
}

const AudioVideoCallContext = createContext<AudioVideoCallContextType | undefined>(undefined);

interface AudioVideoCallProviderProps {
    children: ReactNode;
}

export const AudioVideoCallProvider: React.FC<AudioVideoCallProviderProps> = ({ children }) => {
    const [isCallOpen, setIsCallOpen] = useState(false);
    const [callType, setCallType] = useState<CallType>(null);
    const [physicianName, setPhysicianName] = useState('Dr. Marianne Leger');
    const [physicianAvatar, setPhysicianAvatar] = useState<string | undefined>();

    const startVideoCall = (name = 'Dr. Marianne Leger', avatar?: string) => {
        setPhysicianName(name);
        setPhysicianAvatar(avatar);
        setCallType('video');
        setIsCallOpen(true);
    };

    const startAudioCall = (name = 'Dr. Marianne Leger', avatar?: string) => {
        setPhysicianName(name);
        setPhysicianAvatar(avatar);
        setCallType('audio');
        setIsCallOpen(true);
    };

    const endCall = () => {
        setIsCallOpen(false);
        setCallType(null);
    };

    return (
        <AudioVideoCallContext.Provider
            value={{
                isCallOpen,
                callType,
                physicianName,
                physicianAvatar,
                startVideoCall,
                startAudioCall,
                endCall,
            }}
        >
            {children}
        </AudioVideoCallContext.Provider>
    );
};

export const useGlobalAudioVideoCall = (): AudioVideoCallContextType => {
    const context = useContext(AudioVideoCallContext);
    if (!context) {
        throw new Error('useGlobalAudioVideoCall must be used within a AudioVideoCallProvider');
    }
    return context;
};
