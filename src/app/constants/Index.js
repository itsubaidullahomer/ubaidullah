export const Config = {
  serverApiUrl: "http://localhost:8080/api/",
  githubUserName: "@UbaidullahMOmer",
  githubUrl: "https://github.com/UbaidullahMOmer",
  twitterUserName: "UbaidullahMOmer",
  twitterUrl: "https://twitter.com/ubaidullahmomer",
  facebookUserName: "UbaidullahMOmer",
  facebookUrl: "https://www.facebook.com/ubaidullahmomer/",
  instagramUserName: "UbaidullahMOmer",
  instagramUrl: "https://www.instagram.com/ubaidullahmomer/",
  linkedinUserName: "UbaidullahMOmer",
  linkedinUrl: "https://www.linkedin.com/in/ubaidullahmomer/",
  userToken: "UserToken",
  personalInfo: [
    {
      label: "bio",
      options: [
        {
          label: "Bio.js",
          data: {
            codeSnippet: {
              language: "javascript",
              userName: "Ubaidullah Omer",
              image: "",
              star: "5.0",
              created: "Jan 2022",
              code: `
  const handleResponse = (response: any, ) => {
    if (response.success) {
      fnShowSnackBar({ message: response});
    } else {
      fnShowSnackBar({
        message: response.message",
        error: true,
      });
    }
  };
                    `,
            },
            message: `/**
* About me
* I have 2.3 years of еxperience in web
* development lorem ipsum dolor sit amet,
* consectetur adipiscing elit, sed do eiusmod
* tempor incididunt ut labore et dolore
* magna aliqua. Ut enim ad minim veniam,
* quis nostrud exercitation ullamco laboris
* nisi ut aliquip ex ea commodo consequat.
* Duis aute irure dolor in reprehenderit in
*
* Duis aute irure dolor in reprehenderit in

*/`,
          },
        },
      ],
    },
    {
      label: "education",
      options: [
        {
          label: "School",
          data: {
            codeSnippet: {
              language: "javascript",
              userName: "Ubaidullah Omer",
              image: "",
              star: "5.0",
              created: "Jan 2022",
              code: `
                      function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
                      const value: T = parseModel(chunk._response, chunk._value);
                      const initializedChunk: InitializedChunk<T> = (chunk as any);
                      initializedChunk._status = INITIALIZED;
                      initializedChunk._value = value;
                      return value;
                  }
                      `,
            },
            message: `/**
* About me
* I have 5 years of еxperience in web
* development lorem ipsum dolor sit amet,
* consectetur adipiscing elit, sed do eiusmod
* tempor incididunt ut labore et dolore
* magna aliqua. Ut enim ad minim veniam,
* quis nostrud exercitation ullamco laboris
* nisi ut aliquip ex ea commodo consequat.
* Duis aute irure dolor in reprehenderit in
*
* Duis aute irure dolor in reprehenderit in

*/`,
          },
        },
      ],
    },
    {
      label: "interests",
      options: [
        {
          label: "Football",
          data: {
            codeSnippet: {
              language: "javascript",
              userName: "Ubaidullah Omer",
              image: "",
              star: "5.0",
              created: "Jan 2022",
              code: `
function useHandleLanguage() {
  const selectedLanguage = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const handleLanguage = (value: string) => {
    dispatch(setLanguage(value));
  };
  return { selectedLanguage, handleLanguage };
}
                      `,
            },
            message: `/**
* About me
* I have 5 years of еxperience in web
* development lorem ipsum dolor sit amet,
* consectetur adipiscing elit, sed do eiusmod
* tempor incididunt ut labore et dolore
* magna aliqua. Ut enim ad minim veniam,
* quis nostrud exercitation ullamco laboris
* nisi ut aliquip ex ea commodo consequat.
* Duis aute irure dolor in reprehenderit in
*
* Duis aute irure dolor in reprehenderit in

*/`,
          },
        },
      ],
    },
  ],
  contactData: {
    label: "contacts",
    options: [
      {
        label: "ubaidullahu448@gmail.com",
        value: ":mailto:ubaidullahu448@gmail.com",
      },
      { label: "03036151122", value: ":tel:03036151122" },
    ],
  },
};
