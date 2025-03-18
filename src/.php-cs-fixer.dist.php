<?php

declare(strict_types=1);

$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/app',
        __DIR__ . '/bootstrap',
        __DIR__ . '/config',
        __DIR__ . '/database',
        __DIR__ . '/lang',
        __DIR__ . '/routes',
        __DIR__ . '/tests',
    ]);

$config = new PhpCsFixer\Config();

return $config
    ->setRiskyAllowed(true)
    ->setRules([
        // PSR-12のルールを適用
        '@PSR12' => true,
        // 使用されていないuseを削除
        'no_unused_imports' => true,
        // インポートをアルファベット順に並べる
        'ordered_imports' => true,
        // キャストにスペースを追加
        'cast_spaces' => true,
        // 文字列連結時にスペースを追加
        'concat_space' => [
            'spacing' => 'one',
        ],
        // 型ヒントの前にスペースを追加
        'function_typehint_space' => true,
        // 三項演算子の前後にスペースを追加
        'ternary_operator_spaces' => true,
        // 文字列をシングルクオートで統一
        'single_quote' => true,
        // メソッドチェーンのインデントを揃える
        'method_chaining_indentation' => true,
        // クラス内のプロパティやメソッド、定数などを定義する際、その間に空行を入れる
        'class_attributes_separation' => true,
        // クラス内の要素を順番に並べる
        'ordered_class_elements' => true,
        // PHPDocを垂直に揃える
        'phpdoc_align' => [
            'align' => 'vertical',
        ],
        // 複数行コメントのインデントを揃える
        'align_multiline_comment' => true,
        // 演算子のスペースを揃える
        // 縦方向は揃えつつ、横方向は最小限のスペースに揃える
        'binary_operator_spaces' => [
            'operators' => [
                '='  => 'align_single_space_minimal',
                '=>' => 'align_single_space_minimal',
            ],
        ],
        // 末尾にカンマを追加
        'trailing_comma_in_multiline' => true,
        // 配列のカンマの前のスペースを削除
        'no_whitespace_before_comma_in_array' => true,
        // 配列のカンマの後にスペースを追加
        'whitespace_after_comma_in_array' => true,
        // 配列のインデントを揃える
        'array_indentation' => true,
        // 配列のシンタックスを短縮
        'array_syntax' => ['syntax' => 'short'],
        // 配列内の不要なスペースを削除
        'trim_array_spaces' => true,
        // 単一行の配列定義で、最後の要素の後にカンマを入れない
        'no_trailing_comma_in_singleline_array' => true,
        // セミコロンの前のスペースを削除
        'no_singleline_whitespace_before_semicolons' => true,
        // ステートメントの前に空行を追加
        'blank_line_before_statement' => [
            'statements' => [
                'continue',
                'return',
            ],
        ],
        // ステートメントの前に空行を追加
        'blank_line_before_statement' => [
            'statements' => [
                'for',
                'foreach',
                'if',
                'switch',
                'try',
            ],
        ],
    ])
    ->setFinder($finder);
