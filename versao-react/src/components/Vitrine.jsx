export default function Vitrine() {
    return (
        <aside className="vitrine">
            <div className="logo">
                <svg className="logo-marca" viewBox="0 0 40 40" aria-hidden="true">
                    <circle cx="20" cy="20" r="20" fill="#fff" />
                    <path d="M12 10v7a4 4 0 0 0 8 0v-7M16 10v20M27 10c-2.5 2-3.5 5-3.5 9H27v11" fill="none" stroke="#D3261C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Fominha</span>
            </div>

            <p className="vitrine-titulo">Bateu a fome?<br />A gente leva.</p>
            <p className="vitrine-texto">Peça dos restaurantes do seu bairro e receba na porta de casa.</p>

            <svg className="vitrine-ilustracao" viewBox="0 0 640 400" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
                <circle cx="320" cy="300" r="270" fill="#B31E15" />

                {/* Fatia de pizza */}
                <g transform="translate(14 0) rotate(-14 110 220)">
                    <path d="M30 120 Q110 86 190 120 L120 340 Z" fill="#FFD76A" />
                    <path d="M30 120 Q110 86 190 120" fill="none" stroke="#E89A2E" strokeWidth="20" strokeLinecap="round" />
                    <circle cx="82" cy="152" r="17" fill="#C4321F" />
                    <circle cx="140" cy="158" r="15" fill="#C4321F" />
                    <circle cx="112" cy="222" r="16" fill="#C4321F" />
                </g>

                {/* Copo de refrigerante */}
                <path d="M548 164 L566 96 H592" fill="none" stroke="#FFD23F" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M486 180 H596 L582 352 H500 Z" fill="#FFF3E0" />
                <path d="M490.200 232 H591.800 L586.900 292 H495.100 Z" fill="#FFD23F" />
                <rect x="478" y="164" width="126" height="20" rx="8" fill="#fff" />

                {/* Hambúrguer */}
                <path d="M172 298 H468 C468 340 440 352 410 352 H230 C200 352 172 340 172 298 Z" fill="#E89A2E" />
                <rect x="166" y="254" width="308" height="44" rx="22" fill="#5B2C16" />
                <path d="M172 248 H468 Q475 248 475 254 Q475 260 468 260 H424 L398 286 L372 260 H172 Q165 260 165 254 Q165 248 172 248 Z" fill="#FFD23F" />
                <rect x="172" y="232" width="296" height="18" rx="9" fill="#FF7A59" />
                <path d="M156 206 H484 C492 206 490 226 476 226 C460 226 456 240 440 232 C424 224 412 242 396 232 C380 224 368 242 352 232 C336 224 324 242 308 232 C292 224 280 242 264 232 C248 224 236 242 220 232 C204 224 192 240 176 228 C160 226 148 206 156 206 Z" fill="#6DB33F" />
                <path d="M170 210 C170 120 470 120 470 210 Z" fill="#F2A93B" />
                <g fill="#FFF1D6">
                    <ellipse cx="250" cy="170" rx="11" ry="6" transform="rotate(-22 250 170)" />
                    <ellipse cx="300" cy="152" rx="11" ry="6" transform="rotate(-8 300 152)" />
                    <ellipse cx="352" cy="166" rx="11" ry="6" transform="rotate(10 352 166)" />
                    <ellipse cx="400" cy="176" rx="11" ry="6" transform="rotate(24 400 176)" />
                    <ellipse cx="302" cy="186" rx="11" ry="6" />
                </g>
            </svg>
        </aside>
    );
}
