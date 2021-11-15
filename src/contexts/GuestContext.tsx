import React, {
    FunctionComponent,
    createContext,
    useState,
    useContext,
    useEffect,
  } from 'react';

/* Root Context */
type GuestContextProps = {
    isHeaderBannerAuthVisible: boolean;
    setHeaderBannerAuthVisible: (visible: boolean) => void;
};

export const GuestContext = createContext<GuestContextProps>(
    {} as GuestContextProps,
);

export const GuestProvider : FunctionComponent = ({children}) => {

    const [isHeaderBannerAuthVisible, setHeaderBannerAuthVisible] = useState<boolean>(true);

    return(
        <GuestContext.Provider
            value={{
                isHeaderBannerAuthVisible,
                setHeaderBannerAuthVisible,
            }}
        >
            {children}
        </GuestContext.Provider>
    )
}
