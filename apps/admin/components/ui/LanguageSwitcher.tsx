'use client';

import React, { useEffect } from 'react';

export default function GoogleTranslateSwitcher() {
    useEffect(() => {
        (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,ar',
                    layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                'google_translate_element'
            );
        };

        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Remove the script when the component unmounts
            document.body.removeChild(script);
            // Clean up the callback to avoid memory leaks
            delete (window as any).googleTranslateElementInit;
        };
    }, []);

    const switchLanguage = (lang: string) => {
        const selectField = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        console.log("selectField", selectField)
        if (selectField) {
            selectField.value = lang;
            selectField.dispatchEvent(new Event('change'));
        } else {
            console.error("Language selector not found");
        }
    };

    return (
        <></>
        // <div className="flex items-center gap-4">
        //     <button
        //         onClick={() => switchLanguage('ar')}
        //         className="bg-[#ab994e] text-white px-4 py-2 rounded hover:opacity-90 transition"
        //     >
        //         🇸🇦 عربي
        //     </button>
        //     <button
        //         onClick={() => switchLanguage('en')}
        //         className="bg-gray-700 text-white px-4 py-2 rounded hover:opacity-90 transition"
        //     >
        //         🇺🇸 English
        //     </button>
        // </div>
    );
}