import React, { useState, useEffect, useRef, useCallback } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Logo from './Logo';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';

library.add(fas, fab);

const languages = [
    { name: 'JavaScript', mode: 'javascript', icon: ['fab', 'js-square'], color: '#F7DF1E', defaultCode: '// JavaScript\nconsole.log("Hello, World!");' },
    { name: 'Python',     mode: 'python',       icon: ['fab', 'python'],    color: '#3776AB', defaultCode: '# Python\nprint("Hello, World!")' },
    { name: 'C++',        mode: 'text/x-c++src',icon: ['fas', 'code'],      color: '#00599C', defaultCode: '// C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
    { name: 'Java',       mode: 'text/x-java',  icon: ['fab', 'java'],      color: '#007396', defaultCode: '// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
    { name: 'HTML',       mode: 'xml',           icon: ['fab', 'html5'],    color: '#E34F26', defaultCode: '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello, World!</h1>\n  </body>\n</html>' },
    { name: 'CSS',        mode: 'css',           icon: ['fab', 'css3-alt'], color: '#1572B6', defaultCode: '/* CSS */\nbody {\n  font-family: sans-serif;\n  background: #fff;\n}' },
];

const MIN_TERMINAL_HEIGHT = 40;
const MAX_TERMINAL_HEIGHT = 480;
const DEFAULT_TERMINAL_HEIGHT = 180;

const CodeEditor = ({ activeTheme }) => {
    const [activeLang, setActiveLang]       = useState(languages[1]);
    const [terminalOutput, setTerminalOutput] = useState(['> Output will appear here after clicking Run.']);
    const [terminalHeight, setTerminalHeight] = useState(DEFAULT_TERMINAL_HEIGHT);
    const [isTerminalOpen, setIsTerminalOpen] = useState(true);

    const editorRef    = useRef(null);
    const isDragging   = useRef(false);
    const dragStartY   = useRef(0);
    const dragStartHeight = useRef(DEFAULT_TERMINAL_HEIGHT);

    const isDark = activeTheme !== 'day';

    // Color palette, in later stage use codemirror color theme prop, (smthg got wrong)
    const colors = isDark ? {
        bg:       '#0D1117',
        headerBg: '#161B22',
        border:   '#21262d',
        text:     '#c9d1d9',
        subtext:  '#8b949e',
        editorBg: '#0D1117',
        editorFg: '#c9d1d9',
        gutter:   '#161B22',
        gutterFg: '#6e7681',
        cursor:   '#58a6ff',
        selected: '#264f78',
        lineNum:  '#6e7681',
        keyword:  '#ff7b72',
        string:   '#a5d6ff',
        comment:  '#8b949e',
        number:   '#79c0ff',
        atom:     '#ffa657',
    } : {
        bg:       '#FFFFFF',
        headerBg: '#F6F8FA',
        border:   '#d0d7de',
        text:     '#24292f',
        subtext:  '#57606a',
        editorBg: '#FFFFFF',
        editorFg: '#24292f',
        gutter:   '#f6f8fa',
        gutterFg: '#6e7681',
        cursor:   '#0969da',
        selected: '#add6ff',
        lineNum:  '#6e7681',
        keyword:  '#d73a49',
        string:   '#032f62',
        comment:  '#6a737d',
        number:   '#005cc5',
        atom:     '#e36209',
    };

    const handleLangChange = (lang) => {
        setActiveLang(lang);
        if (editorRef.current) {
            editorRef.current.setValue(lang.defaultCode);
            editorRef.current.setOption('mode', lang.mode);
        }
    };

    const handleRun = () => {
        setTerminalOutput([
            `> Running ${activeLang.name}...`,
            `> [Simulated] Code executed successfully.`,
            `> Output: Hello, World!`,
            `> Done in 0.12s.`
        ]);
        if (!isTerminalOpen) setIsTerminalOpen(true);
    };

    const handleReset = () => {
        if (editorRef.current) editorRef.current.setValue(activeLang.defaultCode);
        setTerminalOutput(['> Output cleared.']);
    };

    // Drag prop
    const onMouseDown = useCallback((e) => {
        isDragging.current = true;
        dragStartY.current = e.clientY;
        dragStartHeight.current = terminalHeight;
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
    }, [terminalHeight]);

    useEffect(() => {
        const onMouseMove = (e) => {
            if (!isDragging.current) return;
            const delta = dragStartY.current - e.clientY;
            const next = Math.min(MAX_TERMINAL_HEIGHT, Math.max(MIN_TERMINAL_HEIGHT, dragStartHeight.current + delta));
            setTerminalHeight(next);
        };
        const onMouseUp = () => {
            isDragging.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    const dynamicCSS = `
        .react-codemirror2, .CodeMirror {
            height: 100% !important;
            width: 100% !important;
            background: ${colors.editorBg} !important;
            color: ${colors.editorFg} !important;
        }
        .CodeMirror {
            font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace !important;
            font-size: 14px;
            line-height: 1.75;
        }
        .CodeMirror-scroll { height: 100%; }
        .CodeMirror-gutters {
            background: ${colors.gutter} !important;
            border-right: 1px solid ${colors.border} !important;
        }
        .CodeMirror-linenumber { color: ${colors.lineNum} !important; }
        .CodeMirror-cursor { border-left: 2px solid ${colors.cursor} !important; }
        .CodeMirror-selected { background: ${colors.selected} !important; }
        .CodeMirror-lines { padding: 8px 0 !important; }
        .CodeMirror pre.CodeMirror-line,
        .CodeMirror pre.CodeMirror-line-like { background: transparent !important; }

        /* Syntax token colours */
        .cm-keyword  { color: ${colors.keyword}  !important; }
        .cm-string   { color: ${colors.string}   !important; }
        .cm-comment  { color: ${colors.comment}  !important; font-style: italic; }
        .cm-number   { color: ${colors.number}   !important; }
        .cm-atom     { color: ${colors.atom}     !important; }
        .cm-variable { color: ${colors.editorFg} !important; }
        .cm-operator { color: ${colors.editorFg} !important; }
        .cm-def      { color: ${colors.atom}     !important; }
    `;

    return (
        <div className="px-6 py-5 h-full flex flex-col overflow-hidden">
            <div
                className="flex flex-col rounded-xl overflow-hidden font-sans border"
                style={{ background: colors.bg, color: colors.text, borderColor: colors.border, minHeight: 'calc(100vh - 130px)' }}
            >
                {/* Header */}
                <header
                    className="flex justify-between items-center px-8 py-3 border-b flex-shrink-0"
                    style={{ background: colors.headerBg, borderColor: colors.border }}
                >
                    <div className="flex items-center gap-4">
                        <Logo size="md" />
                        <div>
                            <h1 className="text-lg font-bold tracking-tight" style={{ color: colors.text }}>Codex</h1>
                            <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: colors.subtext }}>
                                Coding Environment · {activeLang.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <FontAwesomeIcon icon="rotate-left" /> Reset
                        </button>
                        <button
                            onClick={handleRun}
                            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-green-600/20"
                        >
                            <FontAwesomeIcon icon="play" /> Run
                        </button>
                    </div>
                </header>

                {/* Editor  */}
                <div className="flex flex-row flex-1 overflow-hidden">
                    {/* Language sidebar */}
                    <div
                        className="flex flex-col items-center py-4 px-1 gap-1 flex-shrink-0 border-r"
                        style={{ background: colors.headerBg, borderColor: colors.border }}
                    >
                        {languages.map(lang => (
                            <button
                                key={lang.mode}
                                title={lang.name}
                                onClick={() => handleLangChange(lang)}
                                className="flex items-center justify-center w-11 h-11 rounded-lg transition-all"
                                style={{
                                    background: activeLang.mode === lang.mode
                                        ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')
                                        : 'transparent',
                                    outline: activeLang.mode === lang.mode ? `1px solid ${colors.border}` : 'none',
                                }}
                            >
                                <FontAwesomeIcon icon={lang.icon} style={{ color: lang.color }} className="text-xl" />
                            </button>
                        ))}
                    </div>

                    {/* CodeMirror */}
                    <div className="flex-1 overflow-hidden">
                        <CodeMirror
                            key={activeLang.mode}
                            value={activeLang.defaultCode}
                            editorDidMount={(editor) => {
                                editorRef.current = editor;
                                editor.setSize('100%', '100%');
                                editor.setOption('theme', 'default');
                                editor.refresh();
                            }}
                            options={{
                                mode: activeLang.mode,
                                theme: 'default',
                                lineNumbers: true,
                                autoCloseBrackets: true,
                                matchBrackets: true,
                                indentUnit: 4,
                                tabSize: 4,
                                lineWrapping: true,
                                readOnly: false,
                            }}
                            className="h-full"
                        />
                    </div>
                </div>

                {/* Draggable Terminal */}
                <div
                    className="flex flex-col flex-shrink-0 border-t"
                    style={{
                        height: isTerminalOpen ? terminalHeight : MIN_TERMINAL_HEIGHT,
                        borderColor: colors.border,
                        transition: isDragging.current ? 'none' : 'height 0.15s ease',
                    }}
                >
                    {/* Handle */}
                    <div
                        className="flex items-center justify-between px-5 py-2 cursor-row-resize select-none flex-shrink-0 border-b"
                        style={{ background: colors.headerBg, borderColor: colors.border }}
                        onMouseDown={onMouseDown}
                    >
                        <div className="flex items-center gap-2">
                            {/* <div className="w-8 h-1 rounded-full" style={{ background: colors.border }} /> */}
                            <span className="text-[11px] font-bold uppercase tracking-widest ml-2" style={{ color: colors.subtext }}>Terminal</span>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={() => setTerminalOutput(['> Terminal cleared.'])}
                                className="text-xs px-2 py-1 rounded transition-all"
                                style={{ color: colors.subtext }}
                            >
                                <FontAwesomeIcon icon="trash" className="mr-1" /> Clear
                            </button>
                            <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={() => setIsTerminalOpen(v => !v)}
                                className="text-xs px-2 py-1 rounded transition-all"
                                style={{ color: colors.subtext }}
                            >
                                <FontAwesomeIcon icon={isTerminalOpen ? 'chevron-down' : 'chevron-up'} />
                            </button>
                        </div>
                    </div>

                    {/* Output */}
                    {isTerminalOpen && (
                        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm" style={{ background: colors.bg }}>
                            {terminalOutput.map((line, i) => (
                                <div
                                    key={i}
                                    className="leading-6"
                                    style={{
                                        color: line.startsWith('> Error')
                                            ? '#f85149'
                                            : line.startsWith('> Running')
                                            ? '#e3b341'
                                            : '#3fb950',
                                    }}
                                >
                                    {line}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Status bar */}
            <div className="flex justify-between items-center px-4 py-1 text-[10px] font-medium mt-1" style={{ color: colors.subtext }}>
                <div className="flex gap-4">
                    <span>UTF-8</span>
                    <span>Spaces: 4</span>
                    <span>{activeLang.name}</span>
                </div>
                <span>{isDark ? 'Dark' : 'Light'} Mode</span>
            </div>

            <style dangerouslySetInnerHTML={{ __html: dynamicCSS }} />
        </div>
    );
};

export default CodeEditor;